/**
 * Queries send a get/load request to server and triggers an action to set data in store.
 * Usually it uses a saga for the flow.
 */

export const FETCH_SCENARIO_ANALYSIS_DETAILS =
    'FETCH_SCENARIO_ANALYSIS_DETAILS';

export function fetchScenarioAnalysisDetails(id) {
    return {
        type: FETCH_SCENARIO_ANALYSIS_DETAILS,
        payload: {
            id
        }
    };
}
