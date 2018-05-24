import {put, take, call, select} from 'redux-saga/effects';
import {getApiKey} from '../../user/reducers';
import {Command, Query, Action} from '../../t03/actions/index';
import {WebData} from '../../core';

export default function* calculateModflowModelFlow() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // eslint-disable-next-line no-shadow
        const action = yield take(action => WebData.Helpers.waitForAction(action, Command.CALCULATE_MODFLOW_MODEL));

        yield put(WebData.Modifier.Action.responseAction(Command.CALCULATE_MODFLOW_MODEL, {
            type: 'loading',
            data: null
        }));

        try {
            const state = yield select();
            const apiKey = getApiKey(state.session);

            yield put(
                Action.setCalculation(
                    action.tool,
                    {
                        ...state[action.tool].calculation,
                        state: 0,
                        files: [],
                        message: '',
                    }
                )
            );

            yield call(
                WebData.Helpers.fetchStatusWrapper,
                WebData.Modifier.Action.buildRequest('messagebox', 'POST', JSON.stringify({
                    metadata: [],
                    message_name: action.type,
                    payload: action.payload,
                })),
                apiKey
            );
            yield put(Query.getModflowModelCalculation(action.tool, action.id));
        } catch (err) {
            let msg = 'Unknown Error';

            if (typeof err === 'string') {
                msg = err;
            } else {
                const error = err.error || {message: undefined};
                msg = error.message || msg;
            }

            yield put(WebData.Modifier.Action.responseAction(action.type, {type: 'error', msg: msg}));
        }
    }
}
