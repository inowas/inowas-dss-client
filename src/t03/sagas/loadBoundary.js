import {put, call, take, select} from 'redux-saga/effects';
import {Query, Action} from '../../t03/actions/index';
import {getApiKey} from '../../user/reducers';
import {WebData} from '../../core';

export default function* loadBoundaryFlow() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // eslint-disable-next-line no-shadow
        const action = yield take(action => action.type === Query.GET_BOUNDARY);

        yield put(WebData.Modifier.Action.responseAction(action.type, {type: 'loading'}));

        yield put(Action.destroyModflowModel(action.tool));
        const state = yield select();
        const apiKey = getApiKey(state.session);

        try {
            const boundary = yield call(
                WebData.Helpers.fetchStatusWrapper,
                WebData.Modifier.Action.buildRequest('modflowmodels/' + action.id + '/boundaries/' + action.bid, 'GET'),
                apiKey
            );

            yield put(Action.setBoundary(action.tool, action.bid, boundary));
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
