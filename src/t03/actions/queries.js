/**
 * Queries send a get/load request to server and triggers an action to set data in store.
 * Usually it uses a saga for the flow.
 */

import { sendQuery } from '../../actions/messageBox';

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

export const GET_MODFLOW_MODEL_CALCULATION = 'GET_MODFLOW_MODEL_CALCULATION';

export function getModflowModelCalculation(tool, id) {
    return {
        type: GET_MODFLOW_MODEL_CALCULATION,
        tool,
        id,
    };
}

export const GET_RESULTS = 'GET_MODFLOW_MODEL_RESULTS';

export function getModflowModelResults(tool, id) {
    return {
        type: GET_RESULTS,
        tool,
        id,
    };
}

export const GET_STRESS_PERIODS = 'GET_MODFLOW_MODEL_STRESS_PERIODS';

export function getStressPeriods(tool, id) {
    return {
        type: GET_STRESS_PERIODS,
        tool,
        id,
    };
}

export const GET_LISTFILE = 'GET_MODFLOW_MODEL_LISTFILE';

export function getListfile(tool, id) {
    return {
        type: GET_LISTFILE,
        tool,
        id,
    };
}

export const GET_FILE = 'GET_MODFLOW_MODEL_FILE';

export function getFile(tool, id, ext) {
    return sendQuery(`calculations/${id}/file/${ext}`, GET_FILE);
}

export const GET_MODFLOW_PACKAGE = 'GET_MODFLOW_PACKAGE';

export function getModflowPackage(tool, id, packageId, packageType) {
    return {
        type: GET_MODFLOW_PACKAGE,
        tool,
        id,
        packageType,
        packageId,
    };
}

export const GET_MODFLOW_PACKAGES = 'GET_MODFLOW_PACKAGES';

export function getModflowPackages(tool, id) {
    return {
        type: GET_MODFLOW_PACKAGES,
        tool,
        id,
    };
}
