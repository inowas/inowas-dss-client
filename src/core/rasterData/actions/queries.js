/**
 * Queries send a get/load request to server and triggers an action to set data in store.
 * Usually it uses a saga for the flow.
 */

export const GET_RASTERFILE = 'GET_RASTERFILE';

export function getRasterFile(id, width, height) {
    return {
        type: GET_RASTERFILE,
        id,
        width,
        height
    };
}
