import {call, put, select} from 'redux-saga/effects';
import {user} from '../selectors';
import {Action} from '../actions';
import {fetchStatusWrapper} from '../helpers';

export default function* sendHttpRequestFlow(action) {
    yield put(Action.responseAction(action.responseAction, {type: 'loading'}, action.tool));

    try {
        const state = yield select();

        const data = yield call(fetchStatusWrapper, action.request, user.getApiKey(state));

        yield put(Action.responseAction(action.responseAction, {type: 'success', data: data}, action.tool));
    } catch (err) {
        let msg = 'Unknown Error';

        if (typeof err === 'string') {
            msg = err;
        } else {
            const error = err.error || {message: undefined};
            msg = error.message || msg;
        }

        yield put(Action.responseAction(action.responseAction, {type: 'error', msg: msg}, action.tool));
    }
}
