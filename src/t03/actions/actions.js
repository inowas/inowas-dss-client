/**
 * Actions triggers only a store change.
 */

export const ADD_AREA_CONTROL_POINT = 'MODEL_EDITOR_MODEL_AREA_ADD_CONTROL_POINT';
export const DELETE_AREA_CONTROL_POINT = 'MODEL_EDITOR_MODEL_DELETE_AREA_CONTROL_POINT';
export const DESTROY_MODFLOW_MODEL = 'MODEL_EDITOR_MODEL_DESTROY';
export const SET_AREA = 'MODEL_EDITOR_MODEL_SET_AREA';
export const SET_AREA_LATITUDE = 'MODEL_EDITOR_MODEL_SET_AREA_LATITUDE';
export const SET_AREA_LONGITUDE = 'MODEL_EDITOR_MODEL_SET_AREA_LONGITUDE';
export const SET_MODFLOW_MODEL = 'MODEL_EDITOR_MODEL_SET';
export const UPDATE_AREA_CONTROL_POINT = 'MODEL_EDITOR_MODEL_AREA_UPDATE_CONTROL_POINT';
export const UPDATE_BOUNDING_BOX = 'MODEL_EDITOR_MODEL_UPDATE_BOUNDING_BOX';
export const UPDATE_GEOMETRY = 'MODEL_EDITOR_UPDATE_GEOMETRY';

export function setModflowModel ( tool, payload ) {
    return {
        type: SET_MODFLOW_MODEL,
        tool,
        payload
    };
}

export function destroyModflowModel ( tool ) {
    return {
        type: DESTROY_MODFLOW_MODEL,
        tool
    };
}

export function updateGeometry ( tool, id, geometry ) {
    return {
        type: UPDATE_GEOMETRY,
        tool,
        payload: {
            id: id,
            geometry: geometry
        }
    };
}

export function setArea ( tool, area ) {
    return {
        type: SET_AREA,
        tool,
        payload: area
    };
}

export function addAreaControlPoint ( tool, lng, lat, index ) {
    return {
        type: ADD_AREA_CONTROL_POINT,
        tool,
        payload: {
            lat,
            lng,
            index
        }
    };
}

export function updateAreaControlPoint ( tool, index, controlPoint ) {
    return {
        type: UPDATE_AREA_CONTROL_POINT,
        tool,
        payload: {
            index,
            controlPoint
        }
    };
}

export function updateBoundingBox ( tool ) {
    return {
        type: UPDATE_BOUNDING_BOX,
        tool,
    };
}

export function setAreaLatitude ( tool, index, lat ) {
    return {
        type: SET_AREA_LATITUDE,
        tool,
        payload: {
            index,
            lat
        }
    };
}

export function setAreaLongitude ( tool, index, lng ) {
    return {
        type: SET_AREA_LONGITUDE,
        tool,
        payload: {
            index,
            lng
        }
    };
}

export function deleteAreaControlPoint ( tool, index ) {
    return {
        type: DELETE_AREA_CONTROL_POINT,
        tool,
        payload: index
    };
}


export const SET_BOUNDARIES = 'MODEL_EDITOR_MODEL_SET_BOUNDARIES';
export const SET_BOUNDARY = 'MODEL_EDITOR_MODEL_SET_BOUNDARY';
export const ADD_BOUNDARY = 'MODEL_EDITOR_MODEL_ADD_BOUNDARY';
export const UPDATE_BOUNDARY = 'MODEL_EDITOR_MODEL_UPDATE_BOUNDARY';
export const ADD_BOUNDARY_CONTROL_POINT = 'MODEL_EDITOR_MODEL_ADD_BOUNDARY_CONTROL_POINT';
export const UPDATE_BOUNDARY_CONTROL_POINT = 'MODEL_EDITOR_MODEL_UPDATE_BOUNDARY_CONTROL_POINT';
export const DELETE_BOUNDARY_CONTROL_POINT = 'MODEL_EDITOR_MODEL_DELETE_BOUNDARY_CONTROL_POINT';
export const UPDATE_BOUNDARY_PUMPING_RATE = 'MODEL_EDITOR_MODEL_UPDATE_BOUNDARY_PUMPING_RATE';
export const ADD_BOUNDARY_PUMPING_RATE = 'MODEL_EDITOR_MODEL_ADD_BOUNDARY_PUMPING_RATE';

export function setBoundaries ( tool, boundaries ) {
    return {
        type: SET_BOUNDARIES,
        tool,
        payload: boundaries
    };
}

export function addBoundary( tool, boundary ) {
    return {
        type: ADD_BOUNDARY,
        tool,
        payload: boundary
    };
}

export function updateBoundary( tool, boundary ) {
    return {
        type: UPDATE_BOUNDARY,
        tool,
        payload: boundary
    };
}

export function setBoundary( tool, boundary ) {
    return {
        type: SET_BOUNDARY,
        tool,
        payload: boundary
    };
}

export function addBoundaryControlPoint( tool, controlPoint, index ) {
    // TODO
}

export function updateBoundaryControlPoint( tool, index, controlPoint ) {
    // TODO
}

export function deleteBoundaryControlPoint( tool, index ) {
    // TODO
}

export function updatePumpingRate( tool, boundaryId, observationPointId, index, datetime, pumpingRate ) {
    return {
        type: UPDATE_BOUNDARY_PUMPING_RATE,
        tool,
        payload: {
            boundaryId,
            observationPointId,
            index,
            datetime,
            pumpingRate
        }
    };
}

export function addPumpingRate( tool, boundaryId, observationPointId, index, datetime, pumpingRate ) {
    return {
        type: ADD_BOUNDARY_PUMPING_RATE,
        tool,
        payload: {
            boundaryId,
            observationPointId,
            index,
            datetime,
            pumpingRate
        }
    };
}

export const EDIT_MODEL_AREA = 'MODEL_EDITOR_MODEL_EDIT_AREA';

export function editModelArea ( tool ) {
    return {
        type: EDIT_MODEL_AREA,
        tool
    };
}
