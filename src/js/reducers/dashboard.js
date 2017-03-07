const initialState = {
    tools: [ {
        slug: 'T02',
        name: 'Groundwater mounding (Hantush)',
        models: [ {
            model_id: 'b6295521-01da-4f80-9ba4-2b1804b23ec1',
            user_id: 'f2dce7df-8e36-4b51-9711-7605620967f9',
            name: 'Test 1',
            description: 'Description',
            project: 'Inowas',
            application: 'test app',
            created_at: '2017-03-03T13:48:07+00:00',
            fake: true
        }, {
            model_id: 'b6295521-01da-4f80-9ba4-2b1804b23ec1',
            user_id: 'f2dce7df-8e36-4b51-9711-7605620967f9',
            name: 'Test 2',
            description: 'Description',
            project: 'Inowas',
            application: 'test app',
            created_at: '2017-03-03T13:48:07+00:00',
            fake: true
        } ]
    }, {
        slug: 'T07',
        name: 'Scenario Analysis',
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
