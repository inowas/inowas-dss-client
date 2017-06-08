import { getName, getDescription, getArea, getTimeUnit, getLengthUnit } from '../reducers/ModelEditor/general';
import { getBoundary } from '../reducers/ModelEditor/boundaries';
import { getActiveBoundary } from '../reducers/ModelEditor/ui';
import { push } from 'react-router-redux';

/**
 * UI
 */

export function setState( tool, mode ) {
    return {
        type: 'MODEL_EDITOR_UI_SET_MAP_MODE',
        tool,
        payload: mode
    };
}

export function setActiveBoundary( tool, id ) {
    return {
        type: 'MODEL_EDITOR_UI_SET_ACTIVE_BOUNDARY',
        tool,
        payload: id
    };
}

export function setDraggedBoundary( tool, id ) {
    return {
        type: 'MODEL_EDITOR_UI_SET_DRAGGED_BOUNDARY',
        tool,
        payload: id
    };
}

export function setMapPosition( tool, position ) {
    return {
        type: 'MODEL_EDITOR_UI_SET_MAP_POSITION',
        tool,
        payload: position
    };
}

export function setMousePositionOnMap( tool, position ) {
    return {
        type: 'MODEL_EDITOR_UI_SET_MOUSE_POSITION_ON_MAP',
        tool,
        payload: position
    };
}

export function setDraggedAreaControlPoint( tool, index ) {
    return {
        type: 'MODEL_EDITOR_UI_SET_DRAGGED_AREA_CONTROL_POINT',
        tool,
        payload: index
    };
}

export function setActiveAreaControlPoint( tool, index ) {
    return {
        type: 'MODEL_EDITOR_UI_SET_ACTIVE_AREA_CONTROL_POINT',
        tool,
        payload: index
    };
}

export function setActiveBoundaryControlPoint( tool, index ) {
    return {
        type: 'MODEL_EDITOR_UI_SET_ACTIVE_BOUNDARY_CONTROL_POINT',
        tool,
        payload: index
    };
}

/**
 * MODEL
 */

/**
 * GENERAL
 */

export function setName( tool, name ) {
    return {
        type: 'MODEL_EDITOR_MODEL_SET_NAME',
        tool,
        payload: name
    };
}

export function setDescription( tool, description ) {
    return {
        type: 'MODEL_EDITOR_MODEL_SET_DESCRIPTION',
        tool,
        payload: description
    };
}

export function setTimeUnit( tool, timeUnit ) {
    return {
        type: 'MODEL_EDITOR_MODEL_SET_TIME_UNIT',
        tool,
        payload: timeUnit
    };
}

export function setLengthUnit( tool, lengthUnit ) {
    return {
        type: 'MODEL_EDITOR_MODEL_SET_LENGTH_UNIT',
        tool,
        payload: lengthUnit
    };
}

export function setArea( tool, area ) {
    return {
        type: 'MODEL_EDITOR_MODEL_SET_AREA',
        tool,
        payload: area
    };
}

export function addAreaControlPoint( tool, lat, lng, index ) {
    return {
        type: 'MODEL_EDITOR_MODEL_AREA_ADD_CONTROL_POINT',
        tool,
        payload: {
            lat,
            lng,
            index
        }
    };
}

export function updateAreaControlPoint( tool, index, controlPoint ) {
    return {
        type: 'MODEL_EDITOR_MODEL_AREA_UPDATE_CONTROL_POINT',
        tool,
        payload: {
            index,
            controlPoint
        }
    };
}

export function setAreaLatitude( tool, index, lat ) {
    return {
        type: 'MODEL_EDITOR_MODEL_SET_AREA_LATITUDE',
        tool,
        payload: {
            index,
            lat
        }
    };
}

export function setAreaLongitude( tool, index, lng ) {
    return {
        type: 'MODEL_EDITOR_MODEL_SET_AREA_LONGITUDE',
        tool,
        payload: {
            index,
            lng
        }
    };
}

export function deleteAreaControlPoint( tool, index ) {
    return {
        type: 'MODEL_EDITOR_MODEL_DELETE_AREA_CONTROL_POINT',
        tool,
        payload: index
    };
}

export function createModel( tool ) {
    // TODO POST to api
    // api should redirect to GET and send validated model
    return ( dispatch, getState ) => {
        const id = 'random_new_id';
        const name = getName( getState().T03.model.general );
        const description = getDescription( getState().T03.model.general );
        const area = getArea( getState().T03.model.general );
        const timeUnit = getTimeUnit( getState().T03.model.general );
        const lengthUnit = getLengthUnit( getState().T03.model.general );

        dispatch( push( '/tools/' + tool + '/' + id ) );
        dispatch( setName( tool, name ) );
        dispatch( setDescription( tool, description ) );
        dispatch( setArea( tool, area ) );
        dispatch( setTimeUnit( tool, timeUnit ) );
        dispatch( setLengthUnit( tool, lengthUnit ) );
    };
}

/**
 * BOUNDARIES
 */

export function addBoundary( tool, boundary ) {
    return {
        type: 'MODEL_EDITOR_MODEL_ADD_BOUNDARY',
        tool,
        payload: boundary
    };
}

export function updateBoundary( tool, boundary ) {
    return {
        type: 'MODEL_EDITOR_MODEL_UPDATE_BOUNDARY',
        tool,
        payload: boundary
    };
}

export function addBoundaryControlPoint( tool, controlPoint, index ) {
    return ( dispatch, getState ) => {
        const id = getBoundary( getState().T03.model.boundaries, getActiveBoundary( getState().T03.ui ) ).id;
        dispatch( {
            type: 'MODEL_EDITOR_MODEL_ADD_BOUNDARY_CONTROL_POINT',
            tool,
            payload: {
                id,
                index,
                controlPoint
            }
        } );
    };
}

export function updateBoundaryControlPoint( tool, index, controlPoint ) {
    return ( dispatch, getState ) => {
        const id = getBoundary( getState().T03.model.boundaries, getActiveBoundary( getState().T03.ui ) ).id;
        dispatch( {
            type: 'MODEL_EDITOR_MODEL_UPDATE_BOUNDARY_CONTROL_POINT',
            tool,
            payload: {
                id,
                index,
                controlPoint
            }
        } );
    };
}

export function deleteBoundaryControlPoint( tool, index ) {
    return ( dispatch, getState ) => {
        const id = getBoundary( getState().T03.model.boundaries, getActiveBoundary( getState().T03.ui ) ).id;
        dispatch( {
            type: 'MODEL_EDITOR_MODEL_DELETE_BOUNDARY_CONTROL_POINT',
            tool,
            payload: {
                id,
                index
            }
        } );
    };
}

export function saveBoundary( tool, id ) {
    // TODO POST to api
    return ( dispatch, getState ) => {
        const boundary = getBoundary( getState().T03.model.boundaries, id );

        dispatch( updateBoundary( tool, boundary ) );
    };
}
