import {put, call, take, select, all} from 'redux-saga/effects';
import {buildRequest, payloadToSetModel} from '../../actions/messageBox';
import {Query, Action} from '../../t03/actions/index';
import {getApiKey} from '../../reducers/user';
import {WebData} from '../../core';

export default function* getModflowDetailsFlow() {
    // eslint-disable-next-line no-constant-condition
    while ( true ) {
        // eslint-disable-next-line no-shadow
        const action = yield take( Query.GET_MODFLOW_MODEL_DETAILS );

        const state = yield select();
        const apiKey = getApiKey( state.user );
        const storedModel = (state[action.tool].model);

        try {
            yield put( WebData.Modifier.Action.responseAction( action.type, { type: 'loading' } ) );

            if (storedModel.id !== action.id) {
                const [model, boundaries, results, soilmodel] = yield all([
                    call(WebData.Helpers.fetchStatusWrapper, buildRequest('modflowmodels/' + action.id, 'GET'), apiKey),
                    call(WebData.Helpers.fetchStatusWrapper, buildRequest('modflowmodels/' + action.id + '/boundaries', 'GET'), apiKey),
                    call(WebData.Helpers.fetchStatusWrapper, buildRequest('modflowmodels/' + action.id + '/results', 'GET'), apiKey),
                    call(WebData.Helpers.fetchStatusWrapper, buildRequest('modflowmodels/' + action.id + '/soilmodel', 'GET'), apiKey)
                ]);

                yield put( Action.setModflowModel( action.tool, payloadToSetModel( model ) ) );
                yield put( Action.setBoundaries( action.tool, boundaries ) );
                yield put( Action.setResults( action.tool, results ) );
                yield put( Action.setSoilmodel( action.tool, soilmodel ) );
            }

            if (action.property === 'boundaries' && action.pId) {
                const boundary = yield call(WebData.Helpers.fetchStatusWrapper, buildRequest( 'modflowmodels/' + action.id + '/boundaries/' + action.pId, 'GET' ), apiKey);
                yield put( Action.setBoundary( action.tool, boundary ) );
            }

            if (action.property === 'soilmodel' && action.pId) {
                const layer = yield call(WebData.Helpers.fetchStatusWrapper, buildRequest( 'modflowmodels/' + action.id + '/soilmodel/' + action.pId, 'GET' ), apiKey);
                yield put( Action.setLayer( action.tool, layer ) );
            }

            if (action.property === 'model-run') {
                const stressperiods = yield call(WebData.Helpers.fetchStatusWrapper, buildRequest( 'modflowmodels/' + action.id + '/stressperiods', 'GET' ), apiKey);
                yield put( Action.setStressPeriods( action.tool, stressperiods ) );
            }

            yield put( WebData.Modifier.Action.responseAction( action.type, { type: 'success', data: null } ) );
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
