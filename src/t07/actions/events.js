/**
 * Events triggers only a store change from a successful command.
 */

export const SCENARIO_ANALYSIS_CREATED = 'scenarioAnalysisCreated';
export const SCENARIO_ANALYSIS_CLONED = 'scenarioAnalysisCloned';
export const SCENARIO_ANALYSIS_DELETED = 'scenarioAnalysisDeleted';

export function scenarioAnalysisCreated(tool, id, payload) {
    return {
        type: SCENARIO_ANALYSIS_CREATED,
        tool,
        id,
        payload
    };
}

export function scenarioAnalysisCloned(tool, id, newId) {
    return {
        type: SCENARIO_ANALYSIS_CLONED,
        tool,
        id,
        payload: newId
    };
}

export function scenarioAnalysisDeleted(tool, id) {
    return {
        type: SCENARIO_ANALYSIS_DELETED,
        tool,
        payload: id
    };
}
