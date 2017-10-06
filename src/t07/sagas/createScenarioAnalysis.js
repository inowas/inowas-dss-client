import { put, take } from 'redux-saga/effects';
import { sendCommand } from '../../actions/messageBox';
import { Command, Event } from '../actions/index';
import { WebData } from '../../core';
import { push } from 'react-router-redux';
import { Routing } from '../actions';

export default function* createScenarioAnalysisFlow() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // eslint-disable-next-line no-shadow
        const action = yield take( action => WebData.Helpers.waitForAction( action, Command.CREATE_SCENARIO_ANALYSIS ) );

        const data = {
            basemodel_id: action.payload.basemodel_id,
            name: action.payload.name,
            description: action.payload.description,
            public: action.payload.public,
            id: action.id
        };

        yield put( sendCommand(
            action.type,
            data
        ) );

        // eslint-disable-next-line no-constant-condition
        while (true) {
            // eslint-disable-next-line no-shadow
            const response = yield take( action => WebData.Helpers.waitForResponse( action, Command.CREATE_SCENARIO_ANALYSIS ) );

            if (response.webData.type === 'error') {
                break;
            }

            if (response.webData.type === 'success') {
                yield put( Event.scenarioAnalysisCreated( action.tool, action.id, action.payload ) );
                yield put(
                    push(
                        Routing.editScenarioAnalysisUrl( action.id )
                    )
                );
                break;
            }
        }
    }
}
