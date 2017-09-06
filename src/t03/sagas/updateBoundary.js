import {put, take} from 'redux-saga/effects';
import {
    sendCommand,
} from '../../actions/messageBox';

import {Command, Action, Event} from '../../t03/actions/index';
import {WebData} from '../../core';

export default function* updateBoundaryFlow() {
    // eslint-disable-next-line no-constant-condition
    while ( true ) {
        // eslint-disable-next-line no-shadow
        const action = yield take( action => action.type === Command.UPDATE_BOUNDARY );

        yield put( Action.setBoundary( action.tool, action.payload.boundary ) );
        yield put( sendCommand( action.type, {...action.payload, boundary_id: action.payload.boundary.id} ) );

        // eslint-disable-next-line no-constant-condition
        while ( true ) {
            // eslint-disable-next-line no-shadow
            const response = yield take( action => WebData.Helpers.waitForResponse( action, Command.UPDATE_BOUNDARY ) );

            if ( response.webData.type === 'error' ) {
                break;
            }

            if ( response.webData.type === 'success' ) {
                yield put( Event.boundaryUpdated( action.tool, action.payload.boundary ) );
                break;
            }
        }
    }
}
