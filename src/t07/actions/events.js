/**
 * Events triggers only a store change from a successful command.
 */

export const SCENARIO_ANALYSIS_CREATED = 'scenarioAnalysisCreated';
export const SCENARIO_ANALYSIS_UPDATED = 'scenarioAnalysisUpdated';
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

export function scenarioAnalysisUpdated(tool, id, payload) {
    return {
        type: SCENARIO_ANALYSIS_UPDATED,
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

export const SCENARIO_CREATED = 'scenarioCreated';
export const SCENARIO_DELETED = 'scenarioDeleted';

export function scenarioCreated(tool, id, payload) {
    return {
        type: SCENARIO_CREATED,
        tool,
        id,
        payload
    };
}

export function scenarioDeleted(tool, payload) {
    return {
        type: SCENARIO_DELETED,
        tool,
        payload
    };
}
