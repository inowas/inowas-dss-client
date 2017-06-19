import TimeUnit from '../../model/TimeUnit';
import LengthUnit from '../../model/LengthUnit';

function getInitialState() {
    return {
        name: '',
        description: '',
        timeUnit: 0,
        lengthUnit: 0,
        area: []
    };
}
const createGeneralReducer = tool => {
    const general = ( state = getInitialState(), action ) => {
        if ( action.tool !== tool ) {
            return state;
        }
        switch ( action.type ) {
            case 'MODEL_EDITOR_MODEL_SET_NAME':
                return { ...state, name: action.payload };

            case 'MODEL_EDITOR_MODEL_SET_DESCRIPTION':
                return { ...state, description: action.payload };

            case 'MODEL_EDITOR_MODEL_SET_TIME_UNIT':
                if ( action.payload instanceof TimeUnit ) {
                    return { ...state, timeUnit: action.payload.toNumber };
                }
                return state;

            case 'MODEL_EDITOR_MODEL_SET_LENGTH_UNIT':
                if ( action.payload instanceof LengthUnit ) {
                    return { ...state, lengthUnit: action.payload.toNumber };
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
export const getTimeUnit = state => TimeUnit.fromNumber( state.timeUnit );
export const getLengthUnit = state => LengthUnit.fromNumber( state.lengthUnit );
export const getArea = state => state.area;
