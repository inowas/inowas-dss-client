/**
 * Actions triggers only a store change.
 */

export const SET_SCENARIO_ANALYSIS = 'SET_SCENARIO_ANALYSIS';

export function setScenarioAnalysis(scenarioAnalysis) {
    return {
        type: SET_SCENARIO_ANALYSIS,
        payload: scenarioAnalysis
    };
}

export const DESTROY_SCENARIO_ANALYSIS = 'DESTROY_SCENARIO_ANALYSIS';

export function destroyScenarioAnalysis() {
    return {
        type: DESTROY_SCENARIO_ANALYSIS
    };
}

export const SET_SCENARIO_MODELS = 'SET_SCENARIO_MODELS';

export function setScenarioModels(scenarioModels) {
    return {
        type: SET_SCENARIO_MODELS,
        payload: scenarioModels
    };
}
