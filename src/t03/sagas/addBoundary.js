import {put, take} from 'redux-saga/effects';
import {Command, Action, Event} from '../../t03/actions/index';
import {WebData} from '../../core';

export default function* addBoundaryFlow() {
    while (true) {
        const command = yield take(action => action.type === Command.ADD_BOUNDARY);

        if (Array.isArray(command.payload.boundary)) {
            for (let i = 0; i < command.payload.boundary.length; i++) {
                const boundary = command.payload.boundary[i];
                const payload = {
                    id: command.payload.id,
                    boundary: boundary
                };

                yield put(Action.addBoundary(command.tool, boundary));
                yield put(WebData.Modifier.Action.sendCommand(command.type, payload));

                while (true) {
                    const response = yield take(action => WebData.Helpers.waitForResponse(action, Command.ADD_BOUNDARY));

                    if (response.webData.type === 'error') {
                        break;
                    }

                    if (response.webData.type === 'success') {
                        yield put(Action.setDirty(command.tool, true));
                        yield put(Event.boundaryAdded(command.tool, boundary));
                        break;
                    }
                }
            }
        } else {
            yield put(Action.addBoundary(command.tool, command.payload.boundary));
            yield put(WebData.Modifier.Action.sendCommand(command.type, command.payload));

            while (true) {
                const response = yield take(action => WebData.Helpers.waitForResponse(action, Command.ADD_BOUNDARY));

                if (response.webData.type === 'error') {
                    break;
                }

                if (response.webData.type === 'success') {
                    yield put(Action.setDirty(command.tool, true));
                    yield put(Event.boundaryAdded(command.tool, command.payload.boundary));
                    break;
                }
            }
        }
    }
}
