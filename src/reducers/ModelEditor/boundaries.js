const createBoundariesReducer = tool => {
    const boundaries = ( state = [], action ) => {
        if (action.tool !== tool) {
            return state;
        }
        switch ( action.type ) {
            case 'MODEL_EDITOR_MODEL_SET_BOUNDARIES':
                return action.payload;

            case 'MODEL_EDITOR_MODEL_ADD_BOUNDARY':
                return [ ...state, action.payload ];

            case 'MODEL_EDITOR_MODEL_UPDATE_BOUNDARY':
                return state.map( b => {
                    if ( b.id === action.payload.id ) {
                        return { ...b, ...action.payload };
                    }

                    return b;
                } );

            case 'MODEL_EDITOR_MODEL_DELETE_BOUNDARY':
                return [
                    ...state.slice(0, state.findIndex(b => (b.id === action.payload))),
                    ...state.slice(state.findIndex(b => (b.id === action.payload)) + 1, state.length)
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

            default:
                return state;
        }
    };

    return boundaries;
};

export default createBoundariesReducer;

export const getBoundaries = state => state;
export const getBoundary = ( state, id ) => state.find( b => b.id === id );
