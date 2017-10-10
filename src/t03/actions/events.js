/**
 * Events triggers only a store change from a successful command.
 */

export const MODFLOW_MODEL_CREATED = 'modflowModelCreated';
export const MODFLOW_MODEL_UPDATED = 'modflowModelUpdated';
export const MODFLOW_MODEL_CLONED = 'modflowModelCloned';
export const MODFLOW_MODEL_DELETED = 'modflowModelDeleted';

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

export function modflowModelCloned(tool, id, newId) {
    return {
        type: MODFLOW_MODEL_CLONED,
        tool,
        id,
        payload: newId
    };
}

export function modflowModelDeleted(tool, id) {
    return {
        type: MODFLOW_MODEL_DELETED,
        tool,
        payload: id
    };
}

export const BOUNDARY_ADDED = 'boundaryAdded';
export const BOUNDARY_REMOVED = 'boundaryRemoved';
export const BOUNDARY_UPDATED = 'boundaryUpdated';

export function boundaryAdded(tool, data) {
    return {
        type: BOUNDARY_ADDED,
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

export function boundaryUpdated(tool, data) {
    return {
        type: BOUNDARY_UPDATED,
        tool,
        payload: data
    };
}

export const LAYER_ADDED = 'layerAdded';
export const LAYER_REMOVED = 'layerRemoved';
export const LAYER_UPDATED = 'layerUpdated';

export function layerAdded(tool, data) {
    return {
        type: LAYER_ADDED,
        tool,
        payload: data
    };
}

export function layerUpdated(tool, data) {
    return {
        type: LAYER_UPDATED,
        tool,
        payload: data
    };
}

export function layerRemoved(tool, id) {
    return {
        type: LAYER_REMOVED,
        tool,
        payload: id
    };
}


export const STRESS_PERIODS_UPDATED = 'stressPeriodsUpdated';
export const STRESS_PERIODS_CALCULATED = 'stressPeriodsCalculated';

export function stressPeriodsUpdated(tool, data) {
    return {
        type: STRESS_PERIODS_UPDATED,
        tool,
        payload: data
    };
}

export function stressPeriodsCalculated(tool, data) {
    return {
        type: STRESS_PERIODS_CALCULATED,
        tool,
        payload: data
    };
}

export const MODFLOW_PACKAGE_UPDATED = 'modflowPackageUpdated';

export function modflowPackageUpdated(tool, packageId, packageType, data) {
    return {
        type: MODFLOW_PACKAGE_UPDATED,
        tool,
        packageId,
        packageType,
        payload: data
    };
}
