import { call, put, select, take } from 'redux-saga/effects';
import { buildRequest } from '../../actions/messageBox';
import { Query } from '../../t03/actions/index';
import { WebData } from '../../core';
import { Action } from '../actions';
import { getApiKey } from '../../reducers/user';

export default function* loadModflowPackages() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // eslint-disable-next-line no-shadow
        const action = yield take( action => action.type === Query.GET_MODFLOW_PACKAGES );

        yield put( WebData.Modifier.Action.responseAction( action.type, { type: 'loading' } ) );

        const state = yield select();
        const apiKey = getApiKey( state.user );

        try {
            const packages = yield call(
                WebData.Helpers.fetchStatusWrapper,
                buildRequest( `modflowmodels/${action.id}/packages`, 'GET' ),
                apiKey
            );

            yield put( Action.setModflowPackages( action.tool, packages ) );
            yield put(WebData.Modifier.Action.responseAction(action.type, {type: 'success', data: null}));
        } catch ( err ) {
            let msg = 'Unknown Error';

            if ( typeof err === 'string' ) {
                msg = err;
            } else {
                const error = err.error || { message: undefined };
                msg = error.message || msg;
            }

            yield put( WebData.Modifier.Action.responseAction( action.type, { type: 'error', msg: msg } ) );
        }
    }
}
