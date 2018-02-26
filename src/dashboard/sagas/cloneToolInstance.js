import {put, select, take} from 'redux-saga/effects';
import {Selector} from '../../dashboard';
import {Action, Command, Event, Query} from '../actions/index';
import {WebData} from '../../core';

export default function* cloneToolInstance() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // eslint-disable-next-line no-shadow
        const action = yield take(action => WebData.Helpers.waitForAction(action, Command.CLONE_TOOL_INSTANCE));
        yield put(WebData.Modifier.Action.sendCommand(action.type, action.payload));

        // eslint-disable-next-line no-constant-condition
        while (true) {
            // eslint-disable-next-line no-shadow
            const response = yield take(action => WebData.Helpers.waitForResponse(action, Command.CLONE_TOOL_INSTANCE));

            if (response.webData.type === 'error') {
                break;
            }

            if (response.webData.type === 'success') {
                const state = yield select();
                const publicInstances = Selector.ui.getPublic(state.dashboard.ui);

                yield put(Event.toolInstanceCloned(action.tool, action.id, action.payload.id));

                if (publicInstances === false) {
                    yield put(Query.loadInstances(action.tool, publicInstances));
                } else {
                    yield put(Action.setPublic(false));
                }
                break;
            }
        }
    }
}
