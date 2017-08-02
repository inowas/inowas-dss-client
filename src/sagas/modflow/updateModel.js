import {put, take} from 'redux-saga/effects';
import {
    COMMAND_UPDATE_MODFLOW_MODEL, sendCommand,
    stateToCreatePayload
} from "../../actions/messageBox";
import {ActionTypeModel, setModflowModel} from "../../actions/modelEditor";

export function* updateModelFlow () {
    console.log('updateModelFlow started');

    while ( true ) {
        let action = yield take( action => action.type === ActionTypeModel.UPDATE_MODFLOW_MODEL );

        let payload = stateToCreatePayload(action.payload);
        payload[ 'id' ] = action.id;

        yield put( setModflowModel("T03", action.payload ) );
        yield put( sendCommand( COMMAND_UPDATE_MODFLOW_MODEL, payload ) );

        while ( true ) {
            let response = yield take( action => action.type === COMMAND_UPDATE_MODFLOW_MODEL );

            if ( response.webData.type === "error" ) {
                break;
            }

            if ( response.webData.type === "success" ) {
                break;
            }
        }
    }
}
