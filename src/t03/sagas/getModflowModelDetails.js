import {put, all, call, take, select} from 'redux-saga/effects';
import {buildRequest, payloadToSetModel} from "../../actions/messageBox";
import {Query, Action} from "../../t03/actions/index";
import {getApiKey} from "../../reducers/user";
import {WebData} from "../../core";

export default function* getModflowDetailsFlow () {
    while ( true ) {
        let action = yield take( action => action.type === Query.GET_MODFLOW_MODEL_DETAILS );

        yield put( WebData.Modifier.Action.responseAction( action.type, { type: "loading" } ) );
        yield WebData.Modifier.Action.reset( action.type );

        const state = yield select();
        const apiKey = getApiKey( state.user );
        const storedModel = (state[action.tool].model);

        try {

            if (storedModel.id !== action.id) {
                yield Action.destroyModflowModel();
                const model = yield call(WebData.Helpers.fetchStatusWrapper, buildRequest( 'modflowmodels/' + action.id, 'GET' ), apiKey);
                yield put( Action.setModflowModel( action.tool, payloadToSetModel( model ) ) );
                yield put( WebData.Modifier.Action.responseAction( action.type, { type: "success", data: null } ) );
            }

            if (action.property === 'boundaries' && !storedModel.boundaries) {
                const boundaries = yield call(WebData.Helpers.fetchStatusWrapper, buildRequest('modflowmodels/' + action.id + '/boundaries', 'GET'), apiKey);
                yield put(Action.setBoundaries(action.tool, boundaries));
                yield put(WebData.Modifier.Action.responseAction(action.type, {type: "success", data: null}));
            }

            if (action.property === 'boundaries' && action.pId) {
                const boundary = yield call(WebData.Helpers.fetchStatusWrapper, buildRequest( 'modflowmodels/' + action.id + '/boundaries/' + action.pId, 'GET' ), apiKey);
                yield put( Action.setBoundary( action.tool, boundary ) );
                yield put(WebData.Modifier.Action.responseAction(action.type, {type: "success", data: null}));
            }

        } catch ( err ) {
            let msg = "Unknown Error";

            if ( typeof err === "string" ) {
                msg = err;
            } else {
                let error = err.error || { message: undefined };
                msg = error.message || msg;
            }

            yield put( WebData.Modifier.Action.responseAction( action.type, { type: "error", msg: msg } ) );
        }
    }
}
