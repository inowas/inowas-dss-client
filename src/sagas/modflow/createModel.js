import {put, call, take} from 'redux-saga/effects';
import {browserHistory} from 'react-router';
import {COMMAND_CREATE_MODFLOW_MODEL, sendCommand, stateToCreatePayload} from "../../actions/messageBox";
import {ActionTypeModel} from "../../actions/modelEditor";

export function* createModelFlow () {
    console.log('createModelFlow started');

    while ( true ) {
        let action = yield take( action => action.type === ActionTypeModel.CREATE_MODFLOW_MODEL );

        let payload = stateToCreatePayload(action.payload);
        payload[ 'id' ] = action.id;

        yield put( sendCommand( COMMAND_CREATE_MODFLOW_MODEL, payload ) );

        while ( true ) {
            let response = yield take( action => action.type === COMMAND_CREATE_MODFLOW_MODEL );

            if ( response.webData.type === "error" ) {
                break;
            }

            if ( response.webData.type === "success" ) {
                yield call( browserHistory.push, '/tools/' + action.tool + '/' + action.id );
                break;
            }
        }
    }
}
