import {put, take} from 'redux-saga/effects';
import {Command, Action, Event} from '../../t03/actions/index';
import {WebData} from '../../core';

export default function* updateMt3dms() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // eslint-disable-next-line no-shadow
        const action = yield take(action => action.type === Command.UPDATE_MT3DMS);

        yield put(Action.setMt3dms(action.tool, action.payload));
        yield put(WebData.Modifier.Action.sendCommand(action.type, action.payload));

        // eslint-disable-next-line no-constant-condition
        while (true) {
            // eslint-disable-next-line no-shadow
            const response = yield take(action => WebData.Helpers.waitForResponse(action, Command.UPDATE_MT3DMS));

            if (response.webData.type === 'error') {
                break;
            }

            if (response.webData.type === 'success') {
                yield put(Event.mt3dmsUpdated(action.tool, action.payload.mt3dms));
                break;
            }
        }
    }
}
