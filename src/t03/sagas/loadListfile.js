import { put, call, take, select } from 'redux-saga/effects';
import { buildRequest } from '../../actions/messageBox';
import { Query, Action } from '../../t03/actions/index';
import { getApiKey } from '../../reducers/user';
import { WebData } from '../../core';

export default function* loadListfileFlow() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // eslint-disable-next-line no-shadow
        const action = yield take( action => WebData.Helpers.waitForAction( action, Query.GET_LISTFILE ) );

        yield put( WebData.Modifier.Action.responseAction( action.type, { type: 'loading' } ) );

        const state = yield select();
        const apiKey = getApiKey( state.user );

        try {
            const data = yield call(
                WebData.Helpers.fetchStatusWrapper,
                buildRequest( 'calculations/' + action.id + '/file/list', 'GET' ),
                apiKey
            );

            yield put(WebData.Modifier.Action.responseAction(action.type, {type: 'success', data}));
        } catch (err) {
            let msg = 'Unknown Error';

            if (typeof err === 'string') {
                msg = err;
            } else {
                const error = err.error || { message: undefined };
                msg = error.message || msg;
            }

            yield put( WebData.Modifier.Action.responseAction( action.type, { type: 'error', msg: msg } ) );
        }
    }
}
