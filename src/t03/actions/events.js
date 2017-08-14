/**
 * Events triggers only a store change from a successful command.
 */

export const MODFLOW_MODEL_CREATED = 'modflowModelCreated';
export const MODFLOW_MODEL_UPDATED = 'modflowModelUpdated';

export function modflowModelCreated(tool, id, payload) {
    return {
        type: MODFLOW_MODEL_CREATED,
        tool,
        id,
        payload
    };
}

export function modflowModelUpdated(tool, id, payload) {
    return {
        type: MODFLOW_MODEL_UPDATED,
        tool,
        id,
        payload
    };
}

export const BOUNDARY_REMOVED = 'boundaryRemoved';
export const BOUNDARY_UPDATED = 'boundaryUpdateed';

export function boundaryUpdated(tool, data) {
    return {
        type: BOUNDARY_UPDATED,
        tool,
        payload: data
    };
}

export function boundaryRemoved(tool, id) {
    return {
        type: BOUNDARY_REMOVED,
        tool,
        payload: id
    };
}
