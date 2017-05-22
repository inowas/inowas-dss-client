import { getName, getDescription, getArea, getTimeUnit, getLengthUnit } from '../reducers/T03/model';
import { push } from 'react-router-redux';

export function setState( mode ) {
    return {
        type: 'T03_UI_SET_MAP_MODE',
        payload: mode
    };
}

export function setActiveBoundary( boundary ) {
    return {
        type: 'T03_UI_SET_ACTIVE_BOUNDARY',
        payload: boundary
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

export function setDraggedAreaCoordinate( index ) {
    return {
        type: 'T03_UI_SET_DRAGGED_AREA_COORDINATE',
        payload: index
    };
}

export function setActiveAreaCoordinate( index ) {
    return {
        type: 'T03_UI_SET_ACTIVE_AREA_COORDINATE',
        payload: index
    };
}

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

export function addAreaCoordinate( lat, lng, index ) {
    return {
        type: 'T03_MODEL_ADD_AREA_COORDINATE',
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

export function deleteAreaCoordinate( index ) {
    return {
        type: 'T03_MODEL_DELETE_AREA_COORDINATE',
        payload: index
    };
}

export function createModel() {
    // TODO POST to api
    // api should redirect to GET and send validated model
    return ( dispatch, getState ) => {
        const id = 'random_new_id';
        const name = getName( getState().T03.model );
        const description = getDescription( getState().T03.model );
        const area = getArea( getState().T03.model );
        const timeUnit = getTimeUnit( getState().T03.model );
        const lengthUnit = getLengthUnit( getState().T03.model );

        dispatch( push( '/tools/T03/' + id ) );
        dispatch( setName( name ) );
        dispatch( setDescription( description ) );
        dispatch( setArea( area ) );
        dispatch( setTimeUnit( timeUnit ) );
        dispatch( setLengthUnit( lengthUnit ) );
    };
}
