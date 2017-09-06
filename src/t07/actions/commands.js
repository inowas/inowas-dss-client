/**
 * Commands sends a request to server and triggers an event.
 */

export const CREATE_SCENARIO_ANALYSIS = 'createScenarioAnalysis';
export const DELETE_SCENARIO_ANALYSIS = 'deleteScenarioAnalysis';
export const CLONE_SCENARIO_ANALYSIS = 'cloneScenarioAnalysis';

export function createScenarioAnalysis(tool, id, baseModelId, name) {
    return {
        type: CREATE_SCENARIO_ANALYSIS,
        tool,
        id,
        payload: {
            id,
            name,
            basemodel_id: baseModelId
        }
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
