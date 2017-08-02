import {put, all, call, take, select} from 'redux-saga/effects';
import {buildRequest, payloadToSetModel} from "../../actions/messageBox";
import {ActionTypeModel, destroyModflowModel, setBoundaries, setModflowModel} from "../../actions/modelEditor";
import {responseAction, fetchStatusWrapper, reset} from "../../api/webData";
import {getApiKey} from "../../reducers/user";

export function* loadModelFlow () {
    console.log( 'loadModelFlow started' );

    while ( true ) {
        let action = yield take( action => action.type === ActionTypeModel.LOAD_MODFLOW_MODEL );

        yield put( responseAction( action.type, { type: "loading" } ) );

        yield reset( action.type );
        yield destroyModflowModel();

        const state = yield select();
        const apiKey = getApiKey( state.user );

        try {
            const [ model, boundaries ] = yield all( [
                call( fetchStatusWrapper, buildRequest( 'modflowmodels/' + action.id, 'GET' ), apiKey ),
                call( fetchStatusWrapper, buildRequest( 'modflowmodels/' + action.id + '/boundaries', 'GET' ), apiKey )
            ] );

            yield put( setModflowModel( "T03", payloadToSetModel( model ) ) );
            yield put( setBoundaries( "T03", boundaries ) );
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
