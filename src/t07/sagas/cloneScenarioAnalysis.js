import {put, select, take} from 'redux-saga/effects';
import {Command, Event} from '../actions/index';
import {WebData} from '../../core';
import {Modifier, Selector} from '../../dashboard';
import {Query} from '../../dashboard/actions/index';

export default function* cloneScenarioAnalysisFlow() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // eslint-disable-next-line no-shadow
        const action = yield take(action => WebData.Helpers.waitForAction(action, Command.CLONE_SCENARIO_ANALYSIS));
        yield put(WebData.Modifier.Action.sendCommand(action.type, action.payload));

        // eslint-disable-next-line no-constant-condition
        while (true) {
            // eslint-disable-next-line no-shadow
            const response = yield take(action => WebData.Helpers.waitForResponse(action, Command.CLONE_SCENARIO_ANALYSIS));

            if (response.webData.type === 'error') {
                break;
            }

            if (response.webData.type === 'success') {
                yield put(Event.scenarioAnalysisCloned(action.tool, action.id, action.payload.id));
                const state = yield select();
                const publicInstances = Selector.ui.getPublic(state.dashboard.ui);

                if (publicInstances === false) {
                    yield put(Query.loadInstances(action.tool, publicInstances));
                } else {
                    yield put(Modifier.Action.setPublic(false));
                }
                break;
            }
        }
    }
}
