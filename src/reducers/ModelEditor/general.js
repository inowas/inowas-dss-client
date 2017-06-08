function getInitialState() {
    return {
        name: '',
        description: '',
        timeUnit: '',
        lengthUnit: '',
        area: [ {
            lat: 51.0834688793963,
            lng: 13.677635192871096
        },
        {
            lat: 51.09317306026892,
            lng: 13.680381774902346
        },
        {
            lat: 51.09942578687828,
            lng: 13.696174621582033
        },
        {
            lat: 51.101581703449455,
            lng: 13.715057373046877
        },
        {
            lat: 51.09834779089073,
            lng: 13.738059997558596
        },
        {
            lat: 51.09274180657607,
            lng: 13.752136230468752
        },
        {
            lat: 51.08713514258467,
            lng: 13.768959045410156
        },
        {
            lat: 51.07850817842925,
            lng: 13.785095214843752
        },
        {
            lat: 51.065348960470374,
            lng: 13.806724548339846
        },
        {
            lat: 51.05240181690268,
            lng: 13.818397521972658
        },
        {
            lat: 51.0372922399152,
            lng: 13.817710876464846
        },
        {
            lat: 51.02455319725838,
            lng: 13.809471130371096
        },
        {
            lat: 51.01418664707929,
            lng: 13.788528442382814
        },
        {
            lat: 51.007490351548775,
            lng: 13.76964569091797
        },
        {
            lat: 51.0033856925319,
            lng: 13.749389648437502
        },
        {
            lat: 51.00813842240311,
            lng: 13.717117309570314
        },
        {
            lat: 51.01505061478908,
            lng: 13.695831298828127
        },
        {
            lat: 51.024337251103475,
            lng: 13.676605224609377
        },
        {
            lat: 51.03556511729962,
            lng: 13.66252899169922
        },
        {
            lat: 51.05628634012814,
            lng: 13.653602600097658
        },
        {
            lat: 51.066643475703415,
            lng: 13.657379150390625
        },
        {
            lat: 51.07570406867295,
            lng: 13.665618896484375
        }
        ]
    };
}
const createGeneralReducer = tool => {
    const general = ( state = getInitialState(), action ) => {
        if (action.tool !== tool) {
            return state;
        }
        switch ( action.type ) {
            case 'MODEL_EDITOR_MODEL_SET_NAME':
                return { ...state, name: action.payload };

            case 'MODEL_EDITOR_MODEL_SET_DESCRIPTION':
                return { ...state, description: action.payload };

            case 'MODEL_EDITOR_MODEL_SET_TIME_UNIT':
                if ( [ 's', 'min', 'h', 'd', 'yrs' ].indexOf( action.payload !== -1 ) ) {
                    return { ...state, timeUnit: action.payload };
                }
                return state;

            case 'MODEL_EDITOR_MODEL_SET_LENGTH_UNIT':
                if ( [ 'cm', 'm', 'ft' ].indexOf( action.payload !== -1 ) ) {
                    return { ...state, lengthUnit: action.payload };
                }
                return state;

            case 'MODEL_EDITOR_MODEL_SET_AREA':
                return { ...state, area: action.payload };

            case 'MODEL_EDITOR_MODEL_AREA_ADD_CONTROL_POINT':
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

            case 'MODEL_EDITOR_MODEL_AREA_UPDATE_CONTROL_POINT':
                return {
                    ...state,
                    area: state.area.map( ( c, index ) => {
                        if ( index === action.payload.index ) {
                            return action.payload.controlPoint;
                        }
                        return c;
                    } )
                };

            // TODO remove
            case 'MODEL_EDITOR_MODEL_SET_AREA_LATITUDE':
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

            // TODO remove
            case 'MODEL_EDITOR_MODEL_SET_AREA_LONGITUDE':
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

            case 'MODEL_EDITOR_MODEL_DELETE_AREA_CONTROL_POINT':
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

    return general;
};

export default createGeneralReducer;

export const getName = state => state.name;
export const getDescription = state => state.description;
export const getTimeUnit = state => state.timeUnit;
export const getLengthUnit = state => state.lengthUnit;
export const getArea = state => state.area;
