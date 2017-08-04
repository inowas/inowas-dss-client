import Boundary from '../../model/Boundary';
import BoundaryType from '../../model/BoundaryType';

export function handleUpdateBoundary ( state, action ) {
    return state.map( b => {
        if ( b.id === action.payload.id ) {
            return { ...b, ...action.payload.toObject };
        }

        return b;
    } );
}

export function handleUpdateBoundaryGeometry ( boundaries, action ) {

    return boundaries.map( b => {
        if ( b.id === action.payload.id ) {
            return { ...b, geometry: action.payload.geometry };
        }

        return b;
    } );
}

export function handleUpdateAreaGeometry ( state, action ) {
    if (state.id === action.payload.id) {
        return action.payload.geometry;
    }

    return state.geometry;
}

export function handleUpdateBoundaryControlPoint ( state, action ) {
    return state.map( b => {
        if ( b.id === action.payload.id ) {
            return {
                ...b,
                geometry: b.geometry.map( ( c, index ) => {
                    if ( index === action.payload.index ) {
                        return action.payload.controlPoint;
                    }

                    return c;
                } )
            };
        }

        return b;
    } );
}

export function handleDeleteBoundaryControlPoint ( state, action ) {
    return state.map( b => {
        if ( b.id === action.payload.id ) {
            return {
                ...b,
                geometry: [
                    ...b.geometry.slice( 0, action.payload.index ),
                    ...b.geometry.slice( action.payload.index + 1, b.geometry.length )
                ]
            };
        }

        return b;
    } );
}

export function handleAddBoundaryControlPoint ( state, action ) {
    return state.map( b => {
        if ( b.id === action.payload.id ) {
            if ( action.payload.index !== undefined ) {
                return {
                    ...b,
                    geometry: [
                        ...b.geometry.slice( 0, action.payload.index ),
                        action.payload.controlPoint,
                        ...b.geometry.slice( action.payload.index, b.geometry.length )
                    ]
                };
            }
            return {
                ...b,
                geometry: [
                    ...b.geometry,
                    action.payload.controlPoint
                ]
            };
        }

        return b;
    } );
}

export function handleDeleteBoundary ( state, action ) {
    return [
        ...state.slice( 0, state.findIndex( b => ( b.id === action.payload ) ) ),
        ...state.slice( state.findIndex( b => ( b.id === action.payload ) ) + 1, state.length )
    ];
}

export function handleUpdateBoundaryPumpingRate ( state, action ) {
    return state.map( b => {
        if ( b.id === action.payload.boundaryId ) {
            return {
                ...b,
                observationPoints: b.observationPoints.map( op => {
                    if ( op.id === action.payload.observationPointId ) {
                        return {
                            ...op,
                            values: [
                                ...op.values.slice( 0, action.payload.index ),
                                [ action.payload.datetime, action.payload.pumpingRate ],
                                ...op.values.slice( action.payload.index + 1, op.values.length )
                            ]
                        };
                    }

                    return op;
                } )
            };
        }

        return b;
    } );
}

export function handleAddBoundaryPumpingRate ( state, action ) {
    return state.map( b => {
        if ( b.id === action.payload.boundaryId ) {
            return {
                ...b,
                observationPoints: b.observationPoints.map( op => {
                    if ( op.id === action.payload.observationPointId ) {
                        return {
                            ...op,
                            values: [
                                ...op.values.slice( 0, action.payload.index ),
                                [ action.payload.datetime, action.payload.pumpingRate ],
                                ...op.values.slice( action.payload.index, op.values.length )
                            ]
                        };
                    }

                    return op;
                } )
            };
        }

        return b;
    } );
}

export const getBoundaries = state => state.map( b => new Boundary( b.id, b.name, new BoundaryType( b.type ), b.geometry, b.affected_layers, b.metadata, b.observationPoints ) );
export const getBoundary = ( state, id ) => {
    const boundary = state.find( b => b.id === id );
    return boundary ? new Boundary( boundary.id, boundary.name, new BoundaryType( boundary.type ), boundary.geometry, boundary.affected_layers, boundary.metadata ? boundary.metadata : null, boundary.observationPoints ) : null;
};
