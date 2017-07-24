import TimeUnit from '../../model/TimeUnit';
import LengthUnit from '../../model/LengthUnit';

export function handleAreaAddControlPoint ( state, action ) {
    if ( action.payload.index !== undefined ) {
        return {
            ...state,
            geometry: {
                ...state.geometry,
                coordinates: [
                    ...state.geometry.coordinates = [
                        ...state.geometry.coordinates.slice( 0, action.payload.index ),
                        [
                            action.payload.lng,
                            action.payload.lat,
                        ],
                        ...state.geometry.coordinates.slice( action.payload.index, state.geometry.coordinates.length )
                    ]
                ]
            }
        };
    }
    return {
        ...state,
        geometry: {
            ...state.geometry,
            coordinates: [
                ...state.geometry.coordinates, [
                    action.payload.lng,
                    action.payload.lat,
                ] ]
        }
    };
}

export function handleAreaUpdateControlPoint ( state, action ) {
    return {
        ...state,
        geometry: {
            ...state.geometry,
            coordinates: [
                ...state.geometry.coordinates.map( ( c, index ) => {
                    if ( index === action.payload.index ) {
                        return action.payload.controlPoint;
                    }
                    return c;
                } )
            ]
        }
    };
}

export function handleAreaDeleteControlPoint ( state, action ) {
    return {
        ...state,
        geometry: {
            ...state.geometry,
            coordinates: [
                ...state.geometry.coordinates = [
                    ...state.geometry.coordinates.slice( 0, action.payload ),
                    ...state.geometry.coordinates.slice( action.payload + 1, ...state.geometry.coordinates.length )
                ]
            ]
        }
    };
}

export const getName = state => state.name;
export const getDescription = state => state.description;
export const getTimeUnit = state => TimeUnit.fromNumber( state.time_unit );
export const getLengthUnit = state => LengthUnit.fromNumber( state.length_unit );
export const getArea = state => state.geometry.coordinates;
export const getBoundingBox = state => state.bounding_box;
export const getModflowModel = state => state;
