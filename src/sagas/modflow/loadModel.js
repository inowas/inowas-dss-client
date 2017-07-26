import {put, call, take} from 'redux-saga/effects';
import {payloadToSetModel, sendQuery} from "../../actions/messageBox";
import {ActionTypeModel, setModflowModel} from "../../actions/modelEditor";

export function* loadModelFlow () {
    console.log( 'loadModelFlow started' );

    while ( true ) {
        let action = yield take( action => action.type === ActionTypeModel.LOAD_MODFLOW_MODEL );

        yield put( sendQuery( 'modflowmodels/' + action.id, "FETCH_MODEL" ) );

        yield put( sendQuery( 'modflowmodels/' + action.id + '/boundaries', 'FETCH_BOUNDARIES' ) );

        while ( true ) {
            let response = yield take( action => action.type === "FETCH_MODEL" || action.type === 'FETCH_BOUNDARIES' );

            if ( response.webData.type === "error" ) {
                break;
            }

            if ( response.webData.type === "success" ) {
                if ( response.type === "FETCH_MODEL" ) {
                    yield put( setModflowModel("T03", payloadToSetModel(response.webData.data) ) );
                }
                break;
            }
        }
    }
}
