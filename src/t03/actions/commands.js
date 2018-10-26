/**
 * Commands sends a request to server and triggers an event.
 */

export const CALCULATE_MODFLOW_MODEL = 'calculateModflowModel';
export const CREATE_MODFLOW_MODEL = 'createModflowModel';
export const DELETE_MODFLOW_MODEL = 'deleteModflowModel';
export const UPDATE_MODFLOW_MODEL = 'updateModflowModel';
export const CLONE_MODFLOW_MODEL = 'cloneModflowModel';

export function calculateModflowModel(tool, id, routes, params) {
    return {
        type: CALCULATE_MODFLOW_MODEL,
        tool,
        id,
        routes,
        params,
        payload: {id}
    };
}

export function createModflowModel(tool, id, payload, routes, params) {
    return {
        type: CREATE_MODFLOW_MODEL,
        tool,
        id,
        routes,
        params,
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

export function cloneModflowModel(tool, id, newId) {
    return {
        type: CLONE_MODFLOW_MODEL,
        tool,
        id,
        payload: {
            is_tool: true,
            id,
            new_id: newId
        }
    };
}

export function deleteModflowModel(tool, id) {
    return {
        type: DELETE_MODFLOW_MODEL,
        tool,
        payload: {
            id
        }
    };
}

export const ADD_BOUNDARY = 'addBoundary';
export const REMOVE_BOUNDARY = 'removeBoundary';
export const UPDATE_BOUNDARY = 'updateBoundary';

export function addBoundary(tool, modelId, boundary) {
    return {
        type: ADD_BOUNDARY,
        tool,
        payload: {
            boundary: boundary,
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

export const ADD_LAYER = 'addLayer';
export const UPDATE_LAYER = 'updateLayer';
export const REMOVE_LAYER = 'removeLayer';

export function addLayer(tool, modelId, data, routes, params) {
    return {
        type: ADD_LAYER,
        tool,
        routes,
        params,
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
export const CALCULATE_STRESS_PERIODS = 'calculateStressPeriods';


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

export function calculateStressPeriods(tool, modelId, start, end, timeUnit) {
    return {
        type: CALCULATE_STRESS_PERIODS,
        tool,
        payload: {
            id: modelId,
            start,
            end,
            time_unit: timeUnit
        }
    };
}

export const UPDATE_MODFLOW_PACKAGE = 'updateModflowPackage';

export function updateModflowPackage(tool, modelId, packageName, packageType, data) {
    return {
        type: UPDATE_MODFLOW_PACKAGE,
        tool,
        packageType,
        payload: {
            id: modelId,
            data,
            package_name: packageName,
        }
    };
}

export const UPDATE_MT3DMS = 'updateMt3dms';

export function updateMt3dms(tool, modelId, mt3dms) {
    return {
        type: UPDATE_MT3DMS,
        tool,
        payload: {
            id: modelId,
            mt3dms: mt3dms.toObject
        }
    };
}

export const UPDATE_OPTIMIZATION_INPUT = 'updateOptimizationInput';

export function updateOptimizationInput(tool, modelId, input) {
    return {
        type: UPDATE_OPTIMIZATION_INPUT,
        tool,
        payload: {
            id: modelId,
            input: input
        }
    };
}

export const CALCULATE_OPTIMIZATION = 'calculateOptimization';

export function calculateOptimization(tool, modelId, optimization, isInitial) {
    return {
        type: CALCULATE_OPTIMIZATION,
        tool,
        payload: {
            id: modelId,
            optimization_id: optimization.id,
            isInitial: isInitial
        }
    };
}

export const CANCEL_OPTIMIZATION_CALCULATION = 'cancelOptimizationCalculation';

export function cancelOptimizationCalculation(tool, modelId, optimization) {
    return {
        type: CANCEL_OPTIMIZATION_CALCULATION,
        tool,
        payload: {
            id: modelId,
            optimization_id: optimization.id
        }
    };
}
