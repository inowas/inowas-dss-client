/**
 * Queries send a get/load request to server and triggers an action to set data in store.
 * Usually it uses a saga for the flow.
 */

export const GET_MODFLOW_MODEL = 'GET_MODFLOW_MODEL';

export function getModflowModel(tool, id) {
    return {
        type: GET_MODFLOW_MODEL,
        tool,
        id
    };
}

export const GET_MODFLOW_MODEL_DETAILS = 'GET_MODFLOW_MODEL_DETAILS';

export function getModflowModelDetails(tool, id, property, pType, pId) {
    return {
        type: GET_MODFLOW_MODEL_DETAILS,
        tool,
        id,
        property,
        pType,
        pId
    };
}

export const GET_BOUNDARY = 'GET_BOUNDARY';

export function getBoundary(tool, id, bid) {
    return {
        type: GET_BOUNDARY,
        tool,
        id,
        bid
    };
}

export const GET_SOILMODEL_LAYER = 'GET_SOILMODEL_LAYER';

export function getLayer(tool, id, lid) {
    return {
        type: GET_SOILMODEL_LAYER,
        tool,
        id,
        lid
    };
}

export const GET_CALCULATION = 'GET_CALCULATION';

export function getCalculation(tool, id, type, layer, time) {
    return {
        type: GET_CALCULATION,
        tool,
        payload: {
            id,
            type,
            layer,
            time
        }
    };
}
