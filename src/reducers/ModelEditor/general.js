import TimeUnit from '../../model/TimeUnit';
import LengthUnit from '../../model/LengthUnit';

export function handleAreaAddControlPoint ( state, action ) {
    if ( action.payload.index !== undefined ) {
        return {
            ...state,
            coordinates: [
                ...state.coordinates = [
                    ...state.coordinates.slice( 0, action.payload.index ),
                    [
                        action.payload.lng,
                        action.payload.lat,
                    ],
                    ...state.coordinates.slice( action.payload.index, state.coordinates.length )
                ]
            ]
        };
    }
    return {
        ...state,
        coordinates: [
            ...state.coordinates, [
                action.payload.lng,
                action.payload.lat,
            ] ]
    };
}

export function handleAreaUpdateControlPoint ( state, action ) {
    return {
        ...state,
        coordinates: [
            ...state.coordinates.map( ( c, index ) => {
                if ( index === action.payload.index ) {
                    return action.payload.controlPoint;
                }
                return c;
            } )
        ]
    };
}

export function handleAreaDeleteControlPoint ( state, action ) {
    return {
        ...state,
        coordinates: [
            ...state.coordinates = [
                ...state.coordinates.slice( 0, action.payload ),
                ...state.coordinates.slice( action.payload + 1, ...state.coordinates.length )
            ]
        ]
    };
}

export const getName = state => state.name;
export const getDescription = state => state.description;
export const getTimeUnit = state => TimeUnit.fromNumber( state.time_unit );
export const getLengthUnit = state => LengthUnit.fromNumber( state.length_unit );
export const getGeometry = state => state.geometry;
export const getBoundingBox = state => state.bounding_box;
export const getGridSize = state => state.grid_size;
export const getModflowModel = state => state;
