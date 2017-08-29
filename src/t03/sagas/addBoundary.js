import {put, take} from 'redux-saga/effects';
import { sendCommand } from '../../actions/messageBox';
import {Command, Action, Event} from '../../t03/actions/index';
import {WebData} from '../../core';

export default function* addBoundaryFlow() {
    // eslint-disable-next-line no-constant-condition
    while ( true ) {
        // eslint-disable-next-line no-shadow
        const command = yield take( action => action.type === Command.ADD_BOUNDARY );
        yield put( Action.addBoundary( command.tool, command.payload.boundary ) );

        yield put( sendCommand( command.type, command.payload ) );

        // eslint-disable-next-line no-constant-condition
        while ( true ) {
            // eslint-disable-next-line no-shadow
            const response = yield take( action => WebData.Helpers.waitForResponse( action, Command.ADD_BOUNDARY ) );

            if ( response.webData.type === 'error' ) {
                break;
            }

            if ( response.webData.type === 'success' ) {
                yield put( Event.boundaryAdded( command.tool, command.payload.boundary ) );
                break;
            }
        }
    }
}
