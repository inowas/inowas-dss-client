import { put, take } from 'redux-saga/effects';
import { sendCommand } from '../../actions/messageBox';
import { Command, Event } from '../../t03/actions/index';
import { WebData } from '../../core';

export default function* removeLayerFlow() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // eslint-disable-next-line no-shadow
        const action = yield take ( action => action.type === Command.REMOVE_LAYER );

        yield put ( sendCommand ( action.type, action.payload ) );

        // eslint-disable-next-line no-constant-condition
        while (true) {
            // eslint-disable-next-line no-shadow
            const response = yield take ( action => WebData.Helpers.waitForResponse ( action, Command.REMOVE_LAYER ) );

            if (response.webData.type === 'error') {
                break;
            }

            if (response.webData.type === 'success') {
                // TODO remove before send request to server and restore on server error for faster response in frontend
                yield put ( Event.layerRemoved( action.tool, action.payload.layer_id ) );
                break;
            }
        }
    }
}
