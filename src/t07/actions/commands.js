/**
 * Commands sends a request to server and triggers an event.
 */

export const CREATE_SCENARIO_ANALYSIS = 'createScenarioAnalysis';
export const UPDATE_SCENARIO_ANALYSIS = 'updateScenarioAnalysis';
export const DELETE_SCENARIO_ANALYSIS = 'deleteScenarioAnalysis';
export const CLONE_SCENARIO_ANALYSIS = 'cloneScenarioAnalysis';

export function createScenarioAnalysis(tool, id, payload, routes, params) {
    return {
        type: CREATE_SCENARIO_ANALYSIS,
        tool,
        id,
        payload,
        routes,
        params,
    };
}

export function updateScenarioAnalysis(tool, id, payload) {
    return {
        type: UPDATE_SCENARIO_ANALYSIS,
        tool,
        id,
        payload
    };
}

export function cloneScenarioAnalysis(tool, id, newId) {
    return {
        type: CLONE_SCENARIO_ANALYSIS,
        tool,
        id,
        payload: {
            id,
            new_id: newId
        }
    };
}

export function deleteScenarioAnalysis(tool, id) {
    return {
        type: DELETE_SCENARIO_ANALYSIS,
        tool,
        payload: {
            id
        }
    };
}
export const CREATE_SCENARIO = 'createScenario';
export const DELETE_SCENARIO = 'deleteScenario';

export function createScenario(tool, id, baseModelId, scenarioId) {
    return {
        type: CREATE_SCENARIO,
        tool,
        id,
        payload: {
            id,
            scenario_id: scenarioId,
            basemodel_id: baseModelId
        }
    };
}

export function deleteScenario(tool, id, scenarioId) {
    return {
        type: DELETE_SCENARIO,
        tool,
        payload: {
            id,
            scenario_id: scenarioId,
        }
    };
}
