const initialState = {
    tools: [ {
        slug: 'T07',
        models: []
    } ]
};

const dashboard = ( state = initialState, action ) => {
    let newState = state;
    switch ( action.type ) {
        case 'SET_DASHBOARD_MODELS_TO7':
            newState = { ...state };
            newState.tools.find( t => { return ( t.slug === 'T07' ); } ).models = action.payload;
    }
    return newState;
};

export default dashboard;
