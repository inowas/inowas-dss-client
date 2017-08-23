/**
 * Commands sends a request to server and triggers an event.
 */

export const CREATE_MODFLOW_MODEL = 'createModflowModel';
export const DELETE_MODFLOW_MODEL = 'deleteModflowModel';
export const UPDATE_MODFLOW_MODEL = 'updateModflowModel';

export function createModflowModel(tool, id, payload) {
    return {
        type: CREATE_MODFLOW_MODEL,
        tool,
        id,
        payload
    };
}

export function updateModflowModel(tool, id, payload) {
    return {
        type: UPDATE_MODFLOW_MODEL,
        tool,
        id,
        payload
    };
}

export const UPDATE_BOUNDARY = 'updateBoundary';
export const REMOVE_BOUNDARY = 'removeBoundary';

export function updateBoundary(tool, modelId, data) {
    return {
        type: UPDATE_BOUNDARY,
        tool,
        payload: {
            boundary: data,
            id: modelId,
        }
    };
}

export function removeBoundary(tool, boundaryId, modelId) {
    return {
        type: REMOVE_BOUNDARY,
        tool,
        payload: {
            boundary_id: boundaryId,
            id: modelId,
        }
    };
}

export const ADD_LAYER = 'addLayer';
export const UPDATE_LAYER = 'updateLayer';
export const REMOVE_LAYER = 'removeLayer';

export function addLayer(tool, modelId, data) {
    return {
        type: ADD_LAYER,
        tool,
        payload: {
            layer: data,
            id: modelId,
        }
    };
}

export function updateLayer(tool, modelId, data) {
    return {
        type: UPDATE_LAYER,
        tool,
        payload: {
            layer: data,
            id: modelId,
        }
    };
}

export function removeLayer(tool, layerId, modelId) {
    return {
        type: REMOVE_LAYER,
        tool,
        payload: {
            layer_id: layerId,
            id: modelId,
        }
    };
}


export const UPDATE_STRESS_PERIODS = 'updateStressPeriods';


export function updateStressPeriods(tool, modelId, data) {
    return {
        type: UPDATE_STRESS_PERIODS,
        tool,
        payload: {
            stress_periods: data,
            id: modelId,
        }
    };
}
