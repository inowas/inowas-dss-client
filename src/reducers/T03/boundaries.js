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
    type: 'river'
} ];

const boundaries = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'T03_MODEL_ADD_BOUNDARY':
            return [ ...state, action.payload ];

        case 'T03_MODEL_UPDATE_BOUNDARY':
            return state.map( b => {
                if ( b.id === action.payload.id ) {
                    return { ...b, ...action.payload };
                }

                return b;
            } );

        default:
            return state;
    }
};

export default boundaries;

export const getBoundaries = state => state;
export const getBoundary = (state, id) => state.find( b => b.id === id);
