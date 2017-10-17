import { put, take } from 'redux-saga/effects';
import { sendCommand } from '../../actions/messageBox';
import { Command, Query } from '../actions/';
import { WebData } from '../../core';
// import { fetchDetails } from '../../actions/T07';

export default function* createScenarioFlow() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // eslint-disable-next-line no-shadow
        const action = yield take(action =>
            WebData.Helpers.waitForAction(action, Command.CREATE_SCENARIO)
        );

        yield put(sendCommand(action.type, action.payload));

        // eslint-disable-next-line no-constant-condition
        while (true) {
            // eslint-disable-next-line no-shadow
            const response = yield take(action =>
                WebData.Helpers.waitForResponse(action, Command.CREATE_SCENARIO)
            );

            if (response.webData.type === 'error') {
                break;
            }

            if (response.webData.type === 'success') {
                // just reload the whole scenario Analysis
                yield put(Query.fetchScenarioAnalysisDetails(action.id));
                break;
            }
        }
    }
}
