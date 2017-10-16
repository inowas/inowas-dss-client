import { Action } from '../actions';
import { createSelector } from 'reselect';
import { getCurrentScenarioAnalysis } from './ScenarioAnalysis';

// structure:
// {
//     id: {
//         id,
//         name,
//         description,
//         calculationId
//     }
// }

function getInitialState() {
    return {};
}

const ScenarioModels = (state = getInitialState(), action) => {
    switch (action.type) {
        case Action.SET_SCENARIO_MODELS: {
            return {
                ...state,
                ...action.payload
            };
        }
        case Event.SCENARIO_DELETED: {
            return {
                ...state,
                [action.payload.scenario_id]: undefined
            };
        }
        default: {
            return state;
        }
    }
};

export default ScenarioModels;

export const getScenarioModelsByIds = createSelector(
    [state => state.T07.ScenarioModels, getCurrentScenarioAnalysis],
    (scenarioModels, scenarioAnalysis) => {
        return [
            scenarioModels[scenarioAnalysis.baseModelId],
            ...scenarioAnalysis.scenarioModelsIds.map(id => scenarioModels[id])
        ].filter(scenarioModel => scenarioModel);
    }
);
