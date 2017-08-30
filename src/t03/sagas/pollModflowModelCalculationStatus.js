import { put, take } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { sendQuery } from '../../actions/messageBox';
import { Query, Command } from '../../t03/actions/index';
import { WebData } from '../../core';

export default function* pollModflowModelCalculationStatusFlow() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // const action = yield take( action => action.type === Query.GET_MODFLOW_MODEL_CALCULATION );
        const action = yield take( action => WebData.Helpers.waitForAction( action, Query.GET_MODFLOW_MODEL_CALCULATION ) );

        yield put( WebData.Modifier.Action.responseAction( Command.CALCULATE_MODFLOW_MODEL, {
            type: 'loading',
            data: null
        } ) );

        yield put( sendQuery( `modflowmodels/${action.id}/calculation`, Query.GET_MODFLOW_MODEL_CALCULATION ) );

        // eslint-disable-next-line no-constant-condition
        while (true) {
            const responseCalculation = yield take( action => WebData.Helpers.waitForResponse( action, Query.GET_MODFLOW_MODEL_CALCULATION ) );

            if (WebData.Helpers.isError( responseCalculation )) {
                yield put( WebData.Modifier.Action.responseAction( Command.CALCULATE_MODFLOW_MODEL, {
                    type: 'success',
                    data: null
                } ) );
                break;
            }
            if (WebData.Helpers.isSuccess( responseCalculation ) && responseCalculation.webData.data.state !== 3) {
                yield delay( 5000 );
                yield put( sendQuery( `modflowmodels/${action.id}/calculation`, Query.GET_MODFLOW_MODEL_CALCULATION ) );
                continue;
            }
            if (WebData.Helpers.isSuccess( responseCalculation ) && responseCalculation.webData.data.state === 3) {
                yield put( WebData.Modifier.Action.responseAction( Command.CALCULATE_MODFLOW_MODEL, {
                    type: 'success',
                    data: null
                } ) );
                break;
            }
        }
    }
}
