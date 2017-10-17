import { put, take } from 'redux-saga/effects';
import { sendCommand } from '../../actions/messageBox';
import { Command, Event } from '../actions/index';
import { WebData } from '../../core';

export default function* updateScenarioAnalysisFlow() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // eslint-disable-next-line no-shadow
        const action = yield take(action =>
            WebData.Helpers.waitForAction(
                action,
                Command.UPDATE_SCENARIO_ANALYSIS
            )
        );

        const data = {
            basemodel_id: action.payload.baseModelId,
            name: action.payload.name,
            description: action.payload.description,
            public: action.payload.public,
            id: action.id
        };

        yield put(sendCommand(action.type, data));

        // eslint-disable-next-line no-constant-condition
        while (true) {
            // eslint-disable-next-line no-shadow
            const response = yield take(action =>
                WebData.Helpers.waitForResponse(
                    action,
                    Command.UPDATE_SCENARIO_ANALYSIS
                )
            );

            if (response.webData.type === 'error') {
                break;
            }

            if (response.webData.type === 'success') {
                yield put(
                    Event.scenarioAnalysisUpdated(action.tool, action.id, data)
                );
                break;
            }
        }
    }
}
