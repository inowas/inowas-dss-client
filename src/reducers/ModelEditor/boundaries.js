const initialState = [ {
    id: '234234',
    name: 'Well 1',
    type: 'well',
    lat: 51.055207338584964,
    lng: 13.743896484375002,
    affectedLayers: [ 0, 2 ]
}, {
    id: '2wefdw34234',
    name: 'River 1',
    type: 'river',
    geometry: [ {
        lat: 51.07786109126113,
        lng: 13.670082092285158
    },
    {
        lat: 51.07009533933381,
        lng: 13.673515319824219
    },
    {
        lat: 51.06470168927767,
        lng: 13.681411743164062
    },
    {
        lat: 51.06427017012094,
        lng: 13.688621520996096
    },
    {
        lat: 51.06578046957064,
        lng: 13.696861267089846
    },
    {
        lat: 51.07397837820157,
        lng: 13.703041076660158
    },
    {
        lat: 51.076566889774945,
        lng: 13.708534240722658
    },
    {
        lat: 51.077213995043046,
        lng: 13.716087341308594
    },
    {
        lat: 51.072252623373046,
        lng: 13.722267150878908
    },
    {
        lat: 51.06750646574604,
        lng: 13.727416992187502
    },
    {
        lat: 51.06168097070514,
        lng: 13.731880187988281
    },
    {
        lat: 51.055881717495886,
        lng: 13.736729621887209
    },
    {
        lat: 51.054344119247425,
        lng: 13.74145030975342
    },
    {
        lat: 51.054344119247425,
        lng: 13.746986389160158
    },
    {
        lat: 51.0590916264723,
        lng: 13.75865936279297
    },
    {
        lat: 51.06178885690542,
        lng: 13.764839172363283
    },
    {
        lat: 51.06346106085984,
        lng: 13.772220611572267
    },
    {
        lat: 51.06405440903409,
        lng: 13.779258728027346
    },
    {
        lat: 51.06367682471224,
        lng: 13.787026405334474
    },
    {
        lat: 51.06267890846459,
        lng: 13.794536590576174
    },
    {
        lat: 51.061114564028784,
        lng: 13.801231384277346
    },
    {
        lat: 51.05890281445712,
        lng: 13.80560874938965
    },
    {
        lat: 51.05577381753014,
        lng: 13.808398246765138
    },
    {
        lat: 51.04956914662029,
        lng: 13.81337642669678
    },
    {
        lat: 51.043471573264284,
        lng: 13.817882537841799
    }
    ]
} ];

const createBoundariesReducer = tool => {
    const boundaries = ( state = initialState, action ) => {
        if (action.tool !== tool) {
            return state;
        }
        switch ( action.type ) {
            case 'MODEL_EDITOR_MODEL_ADD_BOUNDARY':
                return [ ...state, action.payload ];

            case 'MODEL_EDITOR_MODEL_UPDATE_BOUNDARY':
                return state.map( b => {
                    if ( b.id === action.payload.id ) {
                        return { ...b, ...action.payload };
                    }

                    return b;
                } );

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
