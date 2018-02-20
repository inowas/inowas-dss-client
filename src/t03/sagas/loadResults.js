import {put, call, take, select} from 'redux-saga/effects';
import {buildRequest} from '../../actions/messageBox';
import {Query, Action} from '../../t03/actions/index';
import {getApiKey} from '../../user/reducers';
import {WebData} from '../../core';

export default function* loadResultsFlow() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // eslint-disable-next-line no-shadow
        const action = yield take(action => WebData.Helpers.waitForAction(action, Query.GET_RESULTS));

        yield put(WebData.Modifier.Action.responseAction(action.type, {type: 'loading'}));

        const state = yield select();
        const apiKey = getApiKey(state.user);

        try {
            const results = yield call(
                WebData.Helpers.fetchStatusWrapper,
                buildRequest('modflowmodels/' + action.id + '/results', 'GET'),
                apiKey
            );

            yield put(Action.setResults(action.tool, results));
            yield put(WebData.Modifier.Action.responseAction(action.type, {type: 'success', data: null}));
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
