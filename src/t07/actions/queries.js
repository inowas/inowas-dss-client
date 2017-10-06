/**
 * Queries send a get/load request to server and triggers an action to set data in store.
 * Usually it uses a saga for the flow.
 */

export const GET_SCENARIO_ANALYSIS_DETAILS = 'GET_SCENARIO_ANALYSIS_DETAILS';

export function getScenarioAnalysisDetails(tool, id) {
    return {
        type: GET_SCENARIO_ANALYSIS_DETAILS,
        tool,
        id,
    };
}
