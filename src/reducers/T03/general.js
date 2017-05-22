function getInitialState() {
    return {
        name: '',
        description: '',
        timeUnit: '',
        lengthUnit: '',
        area: []
    };
}

const model = ( state = getInitialState(), action ) => {
    switch ( action.type ) {
        case 'T03_MODEL_SET_NAME':
            return { ...state, name: action.payload };

        case 'T03_MODEL_SET_DESCRIPTION':
            return { ...state, description: action.payload };

        case 'T03_MODEL_SET_TIME_UNIT':
            if ( [ 's', 'min', 'h', 'd', 'yrs' ].indexOf( action.payload !== -1 ) ) {
                return { ...state, timeUnit: action.payload };
            }
            return state;

        case 'T03_MODEL_SET_LENGTH_UNIT':
            if ( [ 'cm', 'm', 'ft' ].indexOf( action.payload !== -1 ) ) {
                return { ...state, lengthUnit: action.payload };
            }
            return state;

        case 'T03_MODEL_SET_AREA':
            return { ...state, area: action.payload };

        case 'T03_MODEL_ADD_AREA_CONTROL_POINT':
            if ( action.payload.index !== undefined ) {
                return {
                    ...state,
                    area: [
                        ...state.area.slice( 0, action.payload.index ),
                        {
                            lat: action.payload.lat,
                            lng: action.payload.lng
                        },
                        ...state.area.slice( action.payload.index, state.area.length )
                    ]
                };
            }
            return { ...state, area: [ ...state.area, action.payload ] };

        case 'T03_MODEL_SET_AREA_LATITUDE':
            return { ...state,
                area: state.area.map( ( c, index ) => {
                    if ( index !== action.payload.index ) {
                        return c;
                    }

                    return {
                        ...c,
                        lat: Number( action.payload.lat )
                    };
                } )
            };

        case 'T03_MODEL_SET_AREA_LONGITUDE':
            return { ...state,
                area: state.area.map( ( c, index ) => {
                    if ( index !== action.payload.index ) {
                        return c;
                    }

                    return {
                        ...c,
                        lng: Number( action.payload.lng )
                    };
                } )
            };

        case 'T03_MODEL_DELETE_AREA_CONTROL_POINT':
            return { ...state,
                area: [
                    ...state.area.slice( 0, action.payload ),
                    ...state.area.slice( action.payload + 1, state.area.length )
                ]
            };

        default:
            return state;
    }
};

export default model;

export const getName = state => state.name;
export const getDescription = state => state.description;
export const getTimeUnit = state => state.timeUnit;
export const getLengthUnit = state => state.lengthUnit;
export const getArea = state => state.area;
