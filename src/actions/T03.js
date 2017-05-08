export function setMapMode( mode ) {
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

export function addAreaCoordinate( lat, lng ) {
    return {
        type: 'T03_MODEL_ADD_AREA_COORDINATE',
        payload: {
            lat,
            lng
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
