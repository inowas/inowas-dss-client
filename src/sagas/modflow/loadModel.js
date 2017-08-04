import {put, all, call, take, select} from 'redux-saga/effects';
import {buildRequest, payloadToSetModel} from "../../actions/messageBox";
import {Query, Action} from "../../t03/actions/index";
import {responseAction, fetchStatusWrapper, reset} from "../../api/webData";
import {getApiKey} from "../../reducers/user";

export function* loadModelFlow () {
    while ( true ) {
        let action = yield take( action => action.type === Query.GET_MODFLOW_MODEL );

        yield put( responseAction( action.type, { type: "loading" } ) );

        yield reset( action.type );
        yield Action.destroyModflowModel();

        const state = yield select();
        const apiKey = getApiKey( state.user );

        try {
            const [ model, boundaries ] = yield all( [
                call( fetchStatusWrapper, buildRequest( 'modflowmodels/' + action.id, 'GET' ), apiKey ),
                call( fetchStatusWrapper, buildRequest( 'modflowmodels/' + action.id + '/boundaries', 'GET' ), apiKey )
            ] );

            yield put( Action.setModflowModel( action.tool, payloadToSetModel( model ) ) );
            yield put( Action.setBoundaries( action.tool, boundaries ) );
            yield put( responseAction( action.type, { type: "success", data: null } ) );

        } catch ( err ) {
            let msg = "Unknown Error";

            if ( typeof err === "string" ) {
                msg = err;
            } else {
                let error = err.error || { message: undefined };
                msg = error.message || msg;
            }

            yield put( responseAction( action.type, { type: "error", msg: msg } ) );
        }
    }
}
