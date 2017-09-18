/**
 * Queries send a get/load request to server and triggers an action to set data in store.
 * Usually it uses a saga for the flow.
 */

export const LOAD_INSTANCES = 'LOAD_INSTANCES';

export function loadInstances(tool, publicInstances) {
    return {
        type: LOAD_INSTANCES,
        tool,
        publicInstances
    };
}
