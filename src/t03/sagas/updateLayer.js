import {put, take} from 'redux-saga/effects';
import {
    sendCommand,
} from '../../actions/messageBox';

import {Command, Action, Event} from '../../t03/actions/index';
import {WebData} from '../../core';

export default function* updateLayerFlow() {
    // eslint-disable-next-line no-constant-condition
    while ( true ) {
        // eslint-disable-next-line no-shadow
        const action = yield take( action => action.type === Command.UPDATE_LAYER );

        yield put( Action.setLayer( action.tool, action.payload.layer ) );
        yield put( sendCommand( action.type, {...action.payload, layer_id: action.payload.layer.id} ) );

        // eslint-disable-next-line no-constant-condition
        while ( true ) {
            // eslint-disable-next-line no-shadow
            const response = yield take( action => WebData.Helpers.waitForResponse( action, Command.UPDATE_LAYER ) );

            if ( response.webData.type === 'error' ) {
                break;
            }

            if ( response.webData.type === 'success' ) {
                yield put( Event.layerUpdated( action.tool, action.payload.layer ) );
                break;
            }
        }
    }
}
