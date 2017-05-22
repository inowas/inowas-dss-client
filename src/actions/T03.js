import { getName, getDescription, getArea, getTimeUnit, getLengthUnit } from '../reducers/T03/general';
import { getBoundary } from '../reducers/T03/boundaries';
import { push } from 'react-router-redux';

/**
 * UI
 */

export function setState( mode ) {
    return {
        type: 'T03_UI_SET_MAP_MODE',
        payload: mode
    };
}

export function setActiveBoundary( id ) {
    return {
        type: 'T03_UI_SET_ACTIVE_BOUNDARY',
        payload: id
    };
}

export function setDraggedBoundary( id ) {
    return {
        type: 'T03_UI_SET_DRAGGED_BOUNDARY',
        payload: id
    };
}

export function setMapPosition( position ) {
    return {
        type: 'T03_UI_SET_MAP_POSITION',
        payload: position
    };
}

export function setMousePositionOnMap( position ) {
    return {
        type: 'T03_UI_SET_MOUSE_POSITION_ON_MAP',
        payload: position
    };
}

export function setDraggedAreaControlPoint( index ) {
    return {
        type: 'T03_UI_SET_DRAGGED_AREA_CONTROL_POINT',
        payload: index
    };
}

export function setActiveAreaControlPoint( index ) {
    return {
        type: 'T03_UI_SET_ACTIVE_AREA_CONTROL_POINT',
        payload: index
    };
}

/**
 * MODEL
 */

/**
 * GENERAL
 */

export function setName( name ) {
    return {
        type: 'T03_MODEL_SET_NAME',
        payload: name
    };
}

export function setDescription( description ) {
    return {
        type: 'T03_MODEL_SET_DESCRIPTION',
        payload: description
    };
}

export function setTimeUnit( timeUnit ) {
    return {
        type: 'T03_MODEL_SET_TIME_UNIT',
        payload: timeUnit
    };
}

export function setLengthUnit( lengthUnit ) {
    return {
        type: 'T03_MODEL_SET_LENGTH_UNIT',
        payload: lengthUnit
    };
}

export function setArea( area ) {
    return {
        type: 'T03_MODEL_SET_AREA',
        payload: area
    };
}

export function addAreaControlPoint( lat, lng, index ) {
    return {
        type: 'T03_MODEL_ADD_AREA_CONTROL_POINT',
        payload: {
            lat,
            lng,
            index
        }
    };
}

export function setAreaLatitude( index, lat ) {
    return {
        type: 'T03_MODEL_SET_AREA_LATITUDE',
        payload: {
            index,
            lat
        }
    };
}

export function setAreaLongitude( index, lng ) {
    return {
        type: 'T03_MODEL_SET_AREA_LONGITUDE',
        payload: {
            index,
            lng
        }
    };
}

export function deleteAreaControlPoint( index ) {
    return {
        type: 'T03_MODEL_DELETE_AREA_CONTROL_POINT',
        payload: index
    };
}

export function createModel() {
    // TODO POST to api
    // api should redirect to GET and send validated model
    return ( dispatch, getState ) => {
        const id = 'random_new_id';
        const name = getName( getState().T03.model.general );
        const description = getDescription( getState().T03.model.general );
        const area = getArea( getState().T03.model.general );
        const timeUnit = getTimeUnit( getState().T03.model.general );
        const lengthUnit = getLengthUnit( getState().T03.model.general );

        dispatch( push( '/tools/T03/' + id ) );
        dispatch( setName( name ) );
        dispatch( setDescription( description ) );
        dispatch( setArea( area ) );
        dispatch( setTimeUnit( timeUnit ) );
        dispatch( setLengthUnit( lengthUnit ) );
    };
}

/**
 * BOUNDARIES
 */

export function addBoundary(boundary) {
    return {
        type: 'T03_MODEL_ADD_BOUNDARY',
        payload: boundary
    };
}

export function updateBoundary(boundary) {
    return {
        type: 'T03_MODEL_UPDATE_BOUNDARY',
        payload: boundary
    };
}

export function saveBoundary(id) {
    // TODO POST to api
    return (dispatch, getState) => {
        const boundary = getBoundary(getState().T03.model.boundaries, id);

        dispatch(updateBoundary(boundary));
    };
}
