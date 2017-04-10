import { unionBy } from 'lodash';

const initialState = {
    tools: [ {
        slug: 'T02',
        name: 'Groundwater mounding (Hantush)',
        path: 'tools/T02/',
        models: [ {
            model_id: 'b6295521-01da-4f80-9ba4-2b1804b23ec1',
            user_name: 'ADMIN',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A02',
            created_at: '2017-03-03T13:48:07+00:00',
            fake: false
        }, {
            model_id: 'b6295521-01da-4f80-9ba4-2b1804b23ec1',
            user_name: 'Ralf Junghanns',
            name: 'Long Bien (Hanoi) infiltration basins',
            description: 'Description',
            project: 'INOWAS',
            application: 'A03',
            created_at: '2017-03-03T13:48:07+00:00',
            fake: true
        }, {
            model_id: 'b6295521-01da-4f80-9ba4-2b1804b23ec1',
            user_name: 'José Bonilla',
            name: 'Heredia wetland infiltration',
            description: 'Description',
            project: 'AyA Costa Rica',
            application: 'A03',
            created_at: '2017-03-03T13:48:07+00:00',
            fake: true
        }, {
            model_id: 'b6295521-01da-4f80-9ba4-2b1804b23ec1',
            user_name: 'Catalin Stefan',
            name: 'Soil-aquifer-treatment at Yavne 2',
            description: 'Description',
            project: 'SHAFDAN',
            application: 'A08',
            created_at: '2017-03-03T13:48:07+00:00',
            fake: true
        }, {
            model_id: 'b6295521-01da-4f80-9ba4-2b1804b23ec1',
            user_name: 'Jens Fahl',
            name: 'Soil-aquifer-treatment at Yavne 4',
            description: 'Description',
            project: 'SHAFDAN',
            application: 'A08',
            created_at: '2017-03-03T13:48:07+00:00',
            fake: true
        }, {
            model_id: 'b6295521-01da-4f80-9ba4-2b1804b23ec1',
            user_name: 'Ralf Junghanns',
            name: 'Mendoza reclamation basins',
            description: 'Description',
            project: 'INOWAS',
            application: 'A03',
            created_at: '2017-03-03T13:48:07+00:00',
            fake: true
        }, {
            model_id: 'b6295521-01da-4f80-9ba4-2b1804b23ec1',
            user_name: 'Felix Barquero',
            name: 'Rapid infiltration basin in Pirna',
            description: 'Description',
            project: 'INOWAS',
            application: 'A10',
            created_at: '2017-03-03T13:48:07+00:00',
            fake: true
        }, {
            model_id: 'b6295521-01da-4f80-9ba4-2b1804b23ec1',
            user_name: 'Thomas Fichtner',
            name: 'Pirna infiltration tank',
            description: 'Description',
            project: 'INOWAS',
            application: 'A10',
            created_at: '2017-03-03T13:48:07+00:00',
            fake: true
        } ]
    }, {
        slug: 'T03',
        name: 'Scenario Editor',
        path: 'tools/T03/',
        models: [ {
            model_id: '03_1',
            user_name: 'ADMIN',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A01',
            created_at: '2017-03-09T18:51:00+00:00',
            fake: false
        } ]
    }, {
        slug: 'T06',
        name: 'MAR method selection',
        path: 'tools/T06/',
        models: [ {
            model_id: '06_1',
            user_name: 'ADMIN',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A01',
            created_at: '2017-03-09T18:51:00+00:00',
            fake: false
        } ]
    }, {
        slug: 'T07',
        name: 'Application-specific scenario analyzer',
        path: 'tools/T07A/',
        models: [ {
            model_id: '07_1',
            user_name: 'Jana Glass',
            name: 'Infiltration basins Hanoi city',
            description: 'Description',
            project: 'INOWAS',
            application: 'A03',
            created_at: '2016-11-28T08:32:19+00:00',
            fake: true
        }, {
            model_id: '07_2',
            user_name: 'Ralf Junghanns',
            name: 'MAR recharge wells in Long Bien',
            description: 'Description',
            project: 'INOWAS',
            application: 'A03',
            created_at: '2016-08-12T15:09:17+00:00',
            fake: true
        }, {
            model_id: '07_3',
            user_name: 'Catalin Stefan',
            name: 'MAR feasibility study',
            description: 'Description',
            project: 'IWAS Vietnam',
            application: 'A03',
            created_at: '2016-04-19T10:13:27+00:00',
            fake: true
        }, {
            model_id: '07_4',
            user_name: 'Vu Thanh Tam',
            name: 'Artificial recharge project in Vietnam',
            description: 'Description',
            project: 'CWRPI',
            application: 'A09',
            created_at: '2016-09-12T11:20:37+00:00',
            fake: true
        }, {
            model_id: '07_5',
            user_name: 'Ngo Van Tuan',
            name: 'Modeling scenarios with MAR',
            description: 'Description',
            project: 'PC-8-26',
            application: 'A12',
            created_at: '2016-10-01T18:41:52+00:00',
            fake: true
        }, {
            model_id: '07_6',
            user_name: 'Jana Glass',
            name: 'MAR feasibility study',
            description: 'Description',
            project: 'INOWAS',
            application: 'A03',
            created_at: '2017-03-01T14:59:10+00:00',
            fake: true
        }, {
            model_id: '07_7',
            user_name: 'Tran Thi Viet Nga',
            name: 'Hanoi base model',
            description: 'Description',
            project: 'HUCE project',
            application: 'A03',
            created_at: '2016-04-19T10:13:27+00:00',
            fake: true
        }, {
            model_id: '07_8',
            user_name: 'Tran Thi Viet Nga',
            name: 'Copy of Hanoi base model',
            description: 'Description',
            project: 'HUCE project',
            application: 'A03',
            created_at: '2016-04-19T10:19:34+00:00',
            fake: true
        } ]
    }, {
        slug: 'T08',
        name: ' 1D transport model (Ogata-Banks)',
        path: 'tools/T08/',
        models: [ {
            model_id: '08',
            user_name: 'ADMIN',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A04',
            created_at: '2017-03-09T19:24:00+00:00',
            fake: false
        } ]
    }, {
        slug: 'T09',
        name: 'Simple saltwater intrusion equations',
        path: 'tools/T09/',
        models: [ {
            model_id: '09',
            user_name: 'ADMIN',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A04',
            created_at: '2017-03-09T19:24:00+00:00',
            fake: false
        } ]
    }, {
        slug: 'T13',
        name: 'Travel time through unconfined aquifer',
        path: 'tools/T13/',
        models: [ {
            model_id: '13',
            user_name: 'ADMIN',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A04',
            created_at: '2017-03-09T19:24:00+00:00',
            fake: false
        } ]
    }, {
        slug: 'T14',
        name: 'Pumping-induced river drawdown',
        path: 'tools/T14/',
        models: [ {
            model_id: '14',
            user_name: 'ADMIN',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A04',
            created_at: '2017-03-09T19:24:00+00:00',
            fake: false
        } ]
    }, {
        slug: 'T16',
        name: 'Calculation of hydraulic conductivity',
        path: 'tools/T16/',
        models: [ {
            model_id: '16',
            user_name: 'ADMIN',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A04',
            created_at: '2017-03-09T19:41:00+00:00',
            fake: false
        } ]
    }, {
        slug: 'T17',
        name: 'Global MAR portal',
        path: 'tools/T17/',
        models: [ {
            model_id: '17_1',
            user_name: 'ADMIN',
            name: 'Global MAR portal',
            description: 'Description',
            project: 'INOWAS',
            application: 'A12',
            created_at: '2017-03-09T19:41:00+00:00',
            fake: false
        } ]
    }, {
        slug: 'T18',
        name: 'SAT basin design',
        path: 'tools/T18/',
        models: [ {
            model_id: '18_1',
            user_name: 'ADMIN',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A12',
            created_at: '2017-03-09T19:45:00+00:00',
            fake: false
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
