import { put, select, call } from 'redux-saga/effects';
import { getApiKey } from '../../../reducers/user';
import { Action } from '../actions';
import ConfiguredAxios from 'ConfiguredAxios';

export default function* singleAjaxRequestFlow({
    url,
    provokingActionType,
    method = 'get',
    data
}) {
    const state = yield select();
    const apiKey = getApiKey(state.user);

    yield put(
        Action.setAjaxStatus(provokingActionType, {
            type: 'loading'
        })
    );

    if (!['post', 'get'].includes(method)) {
        throw new Error('Invalid http method.');
    }

    try {
        const response = yield call(ConfiguredAxios, {
            method,
            url,
            data,
            headers: { 'X-AUTH-TOKEN': apiKey }
        });
        yield put(
            Action.setAjaxStatus(provokingActionType, {
                type: 'success'
            })
        );
        return response.data;
    } catch (e) {
        yield put(
            Action.setAjaxStatus(provokingActionType, {
                type: 'error',
                error: e
            })
        );
        return null;
    }
}
