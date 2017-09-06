import { put, take } from 'redux-saga/effects';
import {
    sendCommand,
    stateToCreatePayload
} from '../../actions/messageBox';

import { Command, Action, Event } from '../../t03/actions/index';
import { WebData } from '../../core';

export default function * updateModelFlow() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // eslint-disable-next-line no-shadow
        const action = yield take(action => action.type === Command.UPDATE_MODFLOW_MODEL);

        const payload = stateToCreatePayload(action.payload);
        payload.id = action.id;

        yield put(sendCommand(action.type, payload));

        // eslint-disable-next-line no-constant-condition
        while (true) {
            // eslint-disable-next-line no-shadow
            const response = yield take(action => WebData.Helpers.waitForResponse(action, Command.UPDATE_MODFLOW_MODEL));

            if (response.webData.type === 'error') {
                yield put(Action.setModflowModel(action.tool, action.payload));
                break;
            }

            if (response.webData.type === 'success') {
                yield put(Event.modflowModelUpdated(action.tool, action.id, action.payload));
                break;
            }
        }
    }
}
