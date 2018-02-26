/**
 * Actions triggers only a store change.
 */
export const DESTROY_MODFLOW_MODEL = 'MODEL_EDITOR_MODEL_DESTROY';
export const SET_MODFLOW_MODEL = 'MODEL_EDITOR_MODEL_SET';
export const SET_ACTIVE_CELLS = 'MODEL_EDITOR_MODEL_SET_ACTIVE_CELLS';
export const UPDATE_BOUNDING_BOX = 'MODEL_EDITOR_MODEL_UPDATE_BOUNDING_BOX';
export const UPDATE_GEOMETRY = 'MODEL_EDITOR_UPDATE_GEOMETRY';
export const SET_MODEL_AREA = 'MODEL_EDITOR_MODEL_SET_AREA';

export function setModelArea(tool, geometry, latLngBounds) {
    return {
        type: SET_MODEL_AREA,
        tool,
        payload: {
            geometry: geometry,
            latLngBounds: latLngBounds
        }
    };
}

export function setModflowModel(tool, payload) {
    return {
        type: SET_MODFLOW_MODEL,
        tool,
        payload
    };
}

export function setActiveCells(tool, payload) {
    return {
        type: SET_ACTIVE_CELLS,
        tool,
        payload
    };
}

export function destroyModflowModel(tool) {
    return {
        type: DESTROY_MODFLOW_MODEL,
        tool
    };
}

export const ADD_BOUNDARY = 'MODEL_EDITOR_MODEL_ADD_BOUNDARY';
export const SET_BOUNDARIES = 'MODEL_EDITOR_MODEL_SET_BOUNDARIES';
export const SET_BOUNDARY = 'MODEL_EDITOR_MODEL_SET_BOUNDARY';
export const SET_LAYER = 'MODEL_EDITOR_MODEL_SET_LAYER';
export const UPDATE_BOUNDARY = 'MODEL_EDITOR_MODEL_UPDATE_BOUNDARY';
export const ADD_BOUNDARY_CONTROL_POINT = 'MODEL_EDITOR_MODEL_ADD_BOUNDARY_CONTROL_POINT';
export const UPDATE_BOUNDARY_CONTROL_POINT = 'MODEL_EDITOR_MODEL_UPDATE_BOUNDARY_CONTROL_POINT';
export const DELETE_BOUNDARY_CONTROL_POINT = 'MODEL_EDITOR_MODEL_DELETE_BOUNDARY_CONTROL_POINT';
export const UPDATE_BOUNDARY_PUMPING_RATE = 'MODEL_EDITOR_MODEL_UPDATE_BOUNDARY_PUMPING_RATE';
export const ADD_BOUNDARY_PUMPING_RATE = 'MODEL_EDITOR_MODEL_ADD_BOUNDARY_PUMPING_RATE';
export const SET_BOUNDARY_GEOMETRY = 'MODEL_EDITOR_MODEL_SET_BOUNDARY_GEOMETRY';
export const SET_STRESS_PERIODS = 'MODEL_EDITOR_MODEL_SET_STRESS_PERIODS';

export function setBoundaryGeometry(tool, boundaryId, observationPointId, geometry) {
    return {
        type: SET_BOUNDARY_GEOMETRY,
        tool,
        payload: {
            id: boundaryId,
            oId: observationPointId,
            geometry: geometry
        }
    };
}

export function setBoundaries(tool, boundaries) {
    return {
        type: SET_BOUNDARIES,
        tool,
        payload: boundaries
    };
}

export function addBoundary(tool, boundary) {
    return {
        type: ADD_BOUNDARY,
        tool,
        payload: boundary
    };
}

export function setBoundary(tool, boundary) {
    return {
        type: SET_BOUNDARY,
        tool,
        payload: boundary
    };
}

export function setLayer(tool, layer) {
    return {
        type: SET_LAYER,
        tool,
        payload: layer
    };
}

export function setStressPeriods(tool, stressperiod) {
    return {
        type: SET_STRESS_PERIODS,
        tool,
        payload: stressperiod
    };
}

export function updatePumpingRate(tool,
                                  boundaryId,
                                  observationPointId,
                                  index,
                                  datetime,
                                  pumpingRate) {
    return {
        type: UPDATE_BOUNDARY_PUMPING_RATE,
        tool,
        payload: {
            boundaryId,
            editObservationPointId: observationPointId,
            index,
            datetime,
            pumpingRate
        }
    };
}

export function addPumpingRate(tool,
                               boundaryId,
                               observationPointId,
                               index,
                               datetime,
                               pumpingRate) {
    return {
        type: ADD_BOUNDARY_PUMPING_RATE,
        tool,
        payload: {
            boundaryId,
            editObservationPointId: observationPointId,
            index,
            datetime,
            pumpingRate
        }
    };
}

export const SET_RESULTS = 'MODEL_EDITOR_MODEL_SET_RESULTS';

export function setResults(tool, results) {
    return {
        type: SET_RESULTS,
        tool,
        payload: results
    };
}

export const SET_SOILMODEL = 'MODEL_EDITOR_MODEL_SET_SOILMODEL';

export function setSoilmodel(tool, soilmodel) {
    return {
        type: SET_SOILMODEL,
        tool,
        payload: soilmodel
    };
}

export const SET_CALCULATION = 'MODEL_EDITOR_MODEL_SET_CALCULATION';

export function setCalculation(tool, calculation) {
    return {
        type: SET_CALCULATION,
        tool,
        payload: calculation
    };
}


export const STOP_GET_MODFLOW_MODEL_CALCULATION = 'STOP_GET_MODFLOW_MODEL_CALCULATION';

export function stopGetModflowModelCalculation(tool, id) {
    return {
        type: STOP_GET_MODFLOW_MODEL_CALCULATION,
        tool,
        id,
    };
}

export const SET_MODFLOW_PACKAGE = 'SET_MODFLOW_PACKAGE';

export function setModflowPackage(tool, packageId, packageType, data) {
    return {
        type: SET_MODFLOW_PACKAGE,
        tool,
        packageId,
        packageType,
        payload: data
    };
}

export const SET_MODFLOW_PACKAGES = 'SET_MODFLOW_PACKAGES';

export function setModflowPackages(tool, data) {
    return {
        type: SET_MODFLOW_PACKAGES,
        tool,
        payload: data
    };
}
