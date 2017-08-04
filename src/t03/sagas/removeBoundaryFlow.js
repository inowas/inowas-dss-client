import {put, take} from 'redux-saga/effects';
import {sendCommand} from "../../actions/messageBox";
import {BoundaryCommands, boundaryRemoved} from "../../actions/modelEditor";
import {waitForResponse} from "../../api/webData";

export default function* removeBoundaryFlow () {

    while ( true ) {
        let action = yield take( action => action.type === BoundaryCommands.REMOVE_BOUNDARY );

        yield put( sendCommand( action.type, action.payload ) );

        while ( true ) {
            const response = yield take( action => waitForResponse(action, BoundaryCommands.REMOVE_BOUNDARY ) );

            if ( response.webData.type === "error" ) {
                break;
            }

            if ( response.webData.type === "success" ) {
                // TODO remove before send request to server and restore on server error for faster response in frontend
                yield put( boundaryRemoved( action.tool, action.payload.boundary_id ) );
                break;
            }
        }
    }
}
