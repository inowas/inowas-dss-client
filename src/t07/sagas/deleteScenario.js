import {put, take} from 'redux-saga/effects';
import {Command, Event} from '../actions/index';
import {WebData} from '../../core';

export default function* deleteScenarioFlow() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const action = yield take(Command.DELETE_SCENARIO);
        yield put(WebData.Modifier.Action.sendCommand(action.type, action.payload));

        // eslint-disable-next-line no-constant-condition
        while (true) {
            // eslint-disable-next-line no-shadow
            const response = yield take(action =>
                WebData.Helpers.waitForResponse(action, Command.DELETE_SCENARIO)
            );

            if (response.webData.type === 'error') {
                break;
            }

            if (response.webData.type === 'success') {
                // TODO remove before send request to server and restore on server error for faster response in frontend
                yield put(Event.scenarioDeleted(action.tool, action.payload));
                break;
            }
        }
    }
}
