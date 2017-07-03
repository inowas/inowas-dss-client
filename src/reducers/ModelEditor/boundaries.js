import Boundary from '../../model/Boundary';
import BoundaryType from '../../model/BoundaryType';
import BoundaryMetadata from '../../model/BoundaryMetadata';

const createBoundariesReducer = tool => {
    const boundaries = ( state = [], action ) => {
        if ( action.tool !== tool ) {
            return state;
        }
        switch ( action.type ) {
            case 'MODEL_EDITOR_MODEL_SET_BOUNDARIES':
                return action.payload.map( b => b.toObject );

            case 'MODEL_EDITOR_MODEL_ADD_BOUNDARY':
                return [ ...state, action.payload.toObject ];

            case 'MODEL_EDITOR_MODEL_UPDATE_BOUNDARY':
                return state.map( b => {
                    if ( b.id === action.payload.id ) {
                        return { ...b, ...action.payload.toObject };
                    }

                    return b;
                } );

            case 'MODEL_EDITOR_MODEL_DELETE_BOUNDARY':
                return [
                    ...state.slice( 0, state.findIndex( b => ( b.id === action.payload ) ) ),
                    ...state.slice( state.findIndex( b => ( b.id === action.payload ) ) + 1, state.length )
                ];

            case 'MODEL_EDITOR_MODEL_ADD_BOUNDARY_CONTROL_POINT':
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

            case 'MODEL_EDITOR_MODEL_UPDATE_BOUNDARY_CONTROL_POINT':
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

            case 'MODEL_EDITOR_MODEL_DELETE_BOUNDARY_CONTROL_POINT':
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

            case 'MODEL_EDITOR_MODEL_UPDATE_BOUNDARY_PUMPING_RATE':
                return state.map( b => {
                    if ( b.id === action.payload.boundaryId ) {
                        return {
                            ...b,
                            observationPoints: b.observationPoints.map( op => {
                                if ( op.id === action.payload.observationPointId ) {
                                    return {
                                        ...op,
                                        values: [
                                            ...op.values.slice(0, action.payload.index),
                                            [action.payload.datetime, action.payload.pumpingRate],
                                            ...op.values.slice(action.payload.index + 1, op.values.length)
                                        ]
                                    };
                                }

                                return op;
                            })
                        };
                    }

                    return b;
                });

            case 'MODEL_EDITOR_MODEL_ADD_BOUNDARY_PUMPING_RATE':
                return state.map( b => {
                    if ( b.id === action.payload.boundaryId ) {
                        return {
                            ...b,
                            observationPoints: b.observationPoints.map( op => {
                                if ( op.id === action.payload.observationPointId ) {
                                    return {
                                        ...op,
                                        values: [
                                            ...op.values.slice(0, action.payload.index),
                                            [action.payload.datetime, action.payload.pumpingRate],
                                            ...op.values.slice(action.payload.index, op.values.length)
                                        ]
                                    };
                                }

                                return op;
                            })
                        };
                    }

                    return b;
                });

            default:
                return state;
        }
    };

    return boundaries;
};

export default createBoundariesReducer;

export const getBoundaries = state => state.map( b => new Boundary( b.id, b.name, new BoundaryType( b.type ), b.geometry, b.affectedLayers, b.metadata ? new BoundaryMetadata( b.metadata ) : null, b.observationPoints ) );
export const getBoundary = ( state, id ) => {
    const boundary = state.find( b => b.id === id );
    return boundary ? new Boundary( boundary.id, boundary.name, new BoundaryType( boundary.type ), boundary.geometry, boundary.affectedLayers, boundary.metadata ? new BoundaryMetadata( boundary.metadata ) : null, boundary.observationPoints ) : null;
};
