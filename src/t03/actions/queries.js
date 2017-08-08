/**
 * Queries send a get/load request to server and triggers an action to set data in store.
 * Usually it uses a saga for the flow.
 */

export const GET_MODFLOW_MODEL = 'GET_MODFLOW_MODEL';

export function getModflowModel ( tool, id ) {
    return {
        type: GET_MODFLOW_MODEL,
        tool,
        id
    };
}

export const GET_BOUNDARY = 'GET_BOUNDARY';

export function getBoundary ( tool, id, bid ) {
    return {
        type: GET_BOUNDARY,
        tool,
        id,
        bid
    };
}
