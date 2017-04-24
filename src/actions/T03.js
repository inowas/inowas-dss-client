export function setActiveTool( tool ) {
    return {
        type: 'T03_UI_SET_ACTIVE_TOOL',
        payload: tool
    };
}

export function setActiveBoundary( boundaryID ) {
    return {
        type: 'T03_UI_SET_ACTIVE_BOUNDARY',
        payload: boundaryID
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
