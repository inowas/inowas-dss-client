/**
 * Actions triggers only a store change.
 */

export const SET_SCENARIO_ANALYSIS = 'SET_SCENARIO_ANALYSIS';
export const DESTROY_SCENARIO_ANALYSIS = 'DESTROY_SCENARIO_ANALYSIS';

export function setScenarioAnalysis(tool, payload) {
    return {
        type: SET_SCENARIO_ANALYSIS,
        tool,
        payload
    };
}

export function destroyScenarioAnalysis(tool) {
    return {
        type: DESTROY_SCENARIO_ANALYSIS,
        tool
    };
}
