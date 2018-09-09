import {put, take} from 'redux-saga/effects';
import {Command, Event} from '../../t03/actions/index';
import {WebData} from '../../core';

export default function* updateOptimization() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // eslint-disable-next-line no-shadow
        const action = yield take(action => action.type === Command.UPDATE_OPTIMIZATION_INPUT);

        yield put(Event.optimizationInputUpdated(action.tool, action.payload.input));
        yield put(WebData.Modifier.Action.sendCommand(action.type, action.payload));

        // eslint-disable-next-line no-constant-condition
        while (true) {
            // eslint-disable-next-line no-shadow
            const response = yield take(action => WebData.Helpers.waitForResponse(action, Command.UPDATE_OPTIMIZATION_INPUT));

            if (response.webData.type === 'error') {
                break;
            }

            if (response.webData.type === 'success') {
                break;
            }
        }
    }
}
