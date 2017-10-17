import { Action, Event } from '../actions';
import { createSelector } from 'reselect';

// structure:
// {
//     id: {
//         id,
//         baseModelId, (you can find the according object in ScenarioModels)
//         scenarioModelsIds: array of ids (you can find the according objects in ScenarioModels)
//         boundingBox,
//         createdAt,
//         area,
//         grid,
//         name,
//         description,
//         permission
//     }
// }

const ScenarioAnalysis = (state = {}, action) => {
    switch (action.type) {
        case Action.SET_SCENARIO_ANALYSIS: {
            return {
                ...state,
                ...action.payload
            };
        }
        case Event.SCENARIO_DELETED: {
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    scenarioModelsIds: state[
                        action.payload.id
                    ].scenarioModelsIds.filter(
                        id => id !== action.payload.scenario_id
                    )
                }
            };
        }
        default: {
            return state;
        }
    }
};

export default ScenarioAnalysis;

export const getScenarioAnalysisById = (state, id) => state[id];
export const getCurrentScenarioAnalysis = createSelector(
    [state => state.T07.ScenarioAnalysis, (state, props) => props.params.id],
    getScenarioAnalysisById
);
