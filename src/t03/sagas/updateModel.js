import {put, take} from 'redux-saga/effects';
import {
    sendCommand,
    stateToCreatePayload
} from '../../actions/messageBox';

import {Command, Action, Event} from '../../t03/actions/index';
import {waitForResponse} from '../../api/webData';

export default function* updateModelFlow () {
    while ( true ) {
        let action = yield take( action => action.type === Command.UPDATE_MODFLOW_MODEL );

        let payload = stateToCreatePayload( action.payload );
        payload[ 'id' ] = action.id;

        yield put( sendCommand( action.type, payload ) );

        while ( true ) {
            const response = yield take( action => waitForResponse( action, Command.UPDATE_MODFLOW_MODEL ) );

            if ( response.webData.type === "error" ) {
                yield put( Action.setModflowModel( action.tool, action.payload ) );
                break;
            }

            if ( response.webData.type === "success" ) {
                yield put( Event.modflowModelUpdated( action.tool, action.id, action.payload ) );
                break;
            }
        }
    }
}
