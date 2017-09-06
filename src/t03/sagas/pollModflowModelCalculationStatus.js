import { put, take } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { sendQuery } from '../../actions/messageBox';
import { Query, Command } from '../../t03/actions/index';
import { WebData } from '../../core';

const STATE_NEW = 0;
const STATE_PREPROCESSING = 1;
const STATE_QUEUED = 2;
const STATE_STARTED = 3;
const STATE_FINISHED = 4;

const MAX_TRY = 20;

export default function* pollModflowModelCalculationStatusFlow() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // const action = yield take( action => action.type === Query.GET_MODFLOW_MODEL_CALCULATION );
        const action = yield take( action => WebData.Helpers.waitForAction( action, Query.GET_MODFLOW_MODEL_CALCULATION ) );

        let i = 0;
        let multi = 1;

        yield put( WebData.Modifier.Action.responseAction( Command.CALCULATE_MODFLOW_MODEL, {
            type: 'loading',
            data: null
        } ) );

        yield put( sendQuery( `modflowmodels/${action.id}/calculation`, Query.GET_MODFLOW_MODEL_CALCULATION ) );

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
                && responseCalculation.webData.data.state !== STATE_NEW
                && responseCalculation.webData.data.state !== STATE_FINISHED
            ) {
                i++;
                yield delay( 5000 * multi );

                if (i % 5 === 0) {
                    multi++;
                }
                yield put( sendQuery( `modflowmodels/${action.id}/calculation`, Query.GET_MODFLOW_MODEL_CALCULATION ) );
                continue;
            }
            if (WebData.Helpers.isSuccess( responseCalculation ) && (responseCalculation.webData.data.state === STATE_FINISHED || responseCalculation.webData.data.state === STATE_NEW)) {
                yield put( Query.getModflowModelResults(action.tool, action.id) );

                yield put( WebData.Modifier.Action.responseAction( Command.CALCULATE_MODFLOW_MODEL, {
                    type: 'success',
                    data: null
                } ) );
                break;
            }
        }
    }
}
