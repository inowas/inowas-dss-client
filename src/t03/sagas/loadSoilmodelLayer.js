import {put, call, take, select} from 'redux-saga/effects';
import {buildRequest} from '../../actions/messageBox';
import {Query, Action} from '../../t03/actions/index';
import {getApiKey} from '../../reducers/user';
import {WebData} from '../../core';

export default function* loadSoilmodelLayerFlow() {
    // eslint-disable-next-line no-constant-condition
    while ( true ) {
        // eslint-disable-next-line no-shadow
        const action = yield take( action => action.type === Query.GET_SOILMODEL_LAYER );

        yield put( WebData.Modifier.Action.responseAction( action.type, { type: 'loading' } ) );

        const state = yield select();
        const apiKey = getApiKey( state.user );

        try {
            const layer = yield call(
                WebData.Helpers.fetchStatusWrapper,
                buildRequest( 'modflowmodels/' + action.id + '/soilmodel/' + action.lid, 'GET' ),
                apiKey
            );

            yield put( Action.setLayer( action.tool, action.lid, layer ) );
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
