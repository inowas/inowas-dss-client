import {put, take, call, cancelled} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {Selector} from '../../t03';
import {Query, Command, Action} from '../actions/index';
import {WebData} from '../../core/index';

const MAX_TRY = 20;

const continuePolling = state => {
    if (state > Selector.optimization.OPTIMIZATION_STATE_STARTED
        && state < Selector.optimization.OPTIMIZATION_STATE_FINISHED) {
        return true;
    }

    // noinspection RedundantIfStatementJS
    if (state === Selector.optimization.OPTIMIZATION_STATE_CANCELLING) {
        return true;
    }

    return false;
};


function* pollOptimizationCalculationStatus(tool, payload) {
    const {id} = payload;
    // eslint-disable-next-line no-constant-condition
    try {
        let i = 0;
        let multi = 1;

        yield put(WebData.Modifier.Action.responseAction(Command.CALCULATE_OPTIMIZATION, {
            type: 'loading',
            data: null
        }));

        yield put(WebData.Modifier.Action.sendQuery(`modflowmodels/${id}/optimization`, Query.GET_OPTIMIZATION));

        // eslint-disable-next-line no-constant-condition
        while (true) {
            const optimizationResponse = yield take(action => WebData.Helpers.waitForResponse(action, Query.GET_OPTIMIZATION));

            if (i === MAX_TRY) {
                break;
            }

            if (WebData.Helpers.isError(optimizationResponse)) {
                yield put(WebData.Modifier.Action.responseAction(Command.CALCULATE_OPTIMIZATION, {
                    type: 'success',
                    data: null
                }));
                break;
            }

            if (WebData.Helpers.isSuccess(optimizationResponse)) {
                const state = optimizationResponse.webData.data.state;

                if (continuePolling(state)) {
                    yield put(Action.setOptimization(tool, optimizationResponse.webData.data));
                    i++;
                    yield delay(3000 * multi);

                    if (i % 5 === 0) {
                        multi++;
                    }
                    yield put(WebData.Modifier.Action.sendQuery(
                        `modflowmodels/${id}/optimization`,
                        Query.GET_OPTIMIZATION)
                    );
                    continue;
                }


                yield put(Action.setOptimization(tool, optimizationResponse.webData.data));
                yield put(WebData.Modifier.Action.responseAction(Command.CALCULATE_OPTIMIZATION, {
                    type: 'success',
                    data: null
                }));
                break;
            }
        }
    } finally {
        if (yield cancelled()) {
            yield put(WebData.Modifier.Action.reset(Command.CALCULATE_OPTIMIZATION));
            yield put(WebData.Modifier.Action.reset(Query.GET_OPTIMIZATION));
        }
    }
}

export default function* pollOptimizationCalculationStatusFlow() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const action = yield take(action => WebData.Helpers.waitForAction(action, Query.GET_OPTIMIZATION));
        yield call(pollOptimizationCalculationStatus, action.tool, action.payload);
    }
}
