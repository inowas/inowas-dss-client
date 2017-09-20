import { put, take, call, cancelled, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { sendQuery } from '../../actions/messageBox';
import { Selector } from '../../t03';
import { Query, Command, Action } from '../actions/index';
import { WebData } from '../../core/index';

const MAX_TRY = 20;

function* pollModflowModelCalculationStatus(tool, id) {
    // eslint-disable-next-line no-constant-condition
    try {
        let i = 0;
        let multi = 1;

        yield put( WebData.Modifier.Action.responseAction( Command.CALCULATE_MODFLOW_MODEL, {
            type: 'loading',
            data: null
        } ) );

        yield put( sendQuery( `modflowmodels/${id}/calculation`, Query.GET_MODFLOW_MODEL_CALCULATION ) );

        // eslint-disable-next-line no-constant-condition
        while (true) {
            const responseCalculation = yield take( action => WebData.Helpers.waitForResponse( action, Query.GET_MODFLOW_MODEL_CALCULATION ) );

            if (i === MAX_TRY) {
                break;
            }

            if (WebData.Helpers.isError( responseCalculation )) {
                yield put( WebData.Modifier.Action.responseAction( Command.CALCULATE_MODFLOW_MODEL, {
                    type: 'success',
                    data: null
                } ) );
                break;
            }
            if (WebData.Helpers.isSuccess( responseCalculation )
                && responseCalculation.webData.data.state !== undefined
                && responseCalculation.webData.data.state !== Selector.model.CALCULATION_STATE_NEW
                && responseCalculation.webData.data.state !== Selector.model.CALCULATION_STATE_FINISHED
            ) {
                yield put( Action.setCalculation( tool, responseCalculation.webData.data ) );
                i++;
                yield delay( 3000 * multi );

                if (i % 5 === 0) {
                    multi++;
                }
                yield put( sendQuery( `modflowmodels/${id}/calculation`, Query.GET_MODFLOW_MODEL_CALCULATION ) );
                continue;
            }
            if (WebData.Helpers.isSuccess( responseCalculation )
                && (responseCalculation.webData.data.state === Selector.model.CALCULATION_STATE_FINISHED
                    || responseCalculation.webData.data.state === Selector.model.CALCULATION_STATE_NEW)
            ) {
                yield put( Query.getModflowModelResults( tool, id ) );
                yield put( Action.setCalculation( tool, responseCalculation.webData.data ) );

                yield put( WebData.Modifier.Action.responseAction( Command.CALCULATE_MODFLOW_MODEL, {
                    type: 'success',
                    data: null
                } ) );
                break;
            }
        }
    }    finally {
        if (yield cancelled()) {
            yield put( WebData.Modifier.Action.reset( Command.CALCULATE_MODFLOW_MODEL ) );
            yield put( WebData.Modifier.Action.reset( Query.GET_MODFLOW_MODEL_CALCULATION ) );
        }
    }
}

export default function* pollModflowModelCalculationStatusFlow() {
    while (true) {
        const action = yield take( action => WebData.Helpers.waitForAction( action, Query.GET_MODFLOW_MODEL_CALCULATION ) );

        yield race( {
            task: call( pollModflowModelCalculationStatus, action.tool, action.id ),
            cancel: take( action => action.type === Action.STOP_GET_MODFLOW_MODEL_CALCULATION )
        } );
    }
}
