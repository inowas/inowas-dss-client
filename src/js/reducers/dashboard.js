import { unionBy } from 'lodash';

const initialState = {
    tools: [ {
        slug: 'T02',
        name: 'Groundwater mounding (Hantush)',
        path: 'tools/T02/',
        models: [ {
            model_id: 'b6295521-01da-4f80-9ba4-2b1804b23ec1',
            user_id: 'Jana Glaß',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A02',
            created_at: '2017-03-03T13:48:07+00:00',
            fake: false
        }, {
            model_id: 'b6295521-01da-4f80-9ba4-2b1804b23ec1',
            user_id: 'Ralf Junghanns',
            name: 'Long Bien (Hanoi) infiltration basins',
            description: 'Description',
            project: 'INOWAS',
            application: 'A03',
            created_at: '2017-03-03T13:48:07+00:00',
            fake: true
        }, {
            model_id: 'b6295521-01da-4f80-9ba4-2b1804b23ec1',
            user_id: 'José Bonilla',
            name: 'Heredia wetland infiltration',
            description: 'Description',
            project: 'AyA Costa Rica',
            application: 'A03',
            created_at: '2017-03-03T13:48:07+00:00',
            fake: true
        }, {
            model_id: 'b6295521-01da-4f80-9ba4-2b1804b23ec1',
            user_id: 'Catalin Stefan',
            name: 'Soil-aquifer-treatment at Yavne 2',
            description: 'Description',
            project: 'SHAFDAN',
            application: 'A08',
            created_at: '2017-03-03T13:48:07+00:00',
            fake: true
        }, {
            model_id: 'b6295521-01da-4f80-9ba4-2b1804b23ec1',
            user_id: 'Jens Fahl',
            name: 'Soil-aquifer-treatment at Yavne 4',
            description: 'Description',
            project: 'SHAFDAN',
            application: 'A08',
            created_at: '2017-03-03T13:48:07+00:00',
            fake: true
        }, {
            model_id: 'b6295521-01da-4f80-9ba4-2b1804b23ec1',
            user_id: 'Ralf Junghanns',
            name: 'Mendoza reclamation basins',
            description: 'Description',
            project: 'INOWAS',
            application: 'A03',
            created_at: '2017-03-03T13:48:07+00:00',
            fake: true
        }, {
            model_id: 'b6295521-01da-4f80-9ba4-2b1804b23ec1',
            user_id: 'Felix Barquero',
            name: 'Rapid infiltration basin in Pirna',
            description: 'Description',
            project: 'INOWAS',
            application: 'A10',
            created_at: '2017-03-03T13:48:07+00:00',
            fake: true
        }, {
            model_id: 'b6295521-01da-4f80-9ba4-2b1804b23ec1',
            user_id: 'Thomas Fichtner',
            name: 'Pirna infiltration tank',
            description: 'Description',
            project: 'INOWAS',
            application: 'A10',
            created_at: '2017-03-03T13:48:07+00:00',
            fake: true
        } ]
    }, {
        slug: 'T07',
        name: 'Scenario Analysis',
        path: 'tools/T07/',
        models: [ {
            model_id: 'b6295521-01da-4f80-9ba4-2b1804b23ec2',
            user_id: 'Ralf Junghanns',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A03',
            created_at: '2017-03-03T13:48:07+00:00',
            fake: true
        } ]
    } ]
};

const dashboard = ( state = initialState, action ) => {
    let newState = state;
    switch ( action.type ) {
        case 'SET_DASHBOARD_MODELS_TO7':
            newState = { ...state };
            state.tools.find( t => { return ( t.slug === 'T07' ); } ).models = unionBy(action.payload, state.tools.find( t => { return ( t.slug === 'T07' ); } ).models, 'model_id');
            break;
    }
    return newState;
};

export default dashboard;
