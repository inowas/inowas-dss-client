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
    }, /*{
        slug: 'T09A',
        name: 'Saltwater intrusion // Depth of freshwater - saltwater interface (Ghyben-Herzberg relation)',
        path: 'tools/T09A/',
        models: [ {
            model_id: '09A_1',
            user_name: 'ADMIN',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A07',
            created_at: '2017-03-09T19:09:00+00:00',
            fake: false
        } ]
    }, {
        slug: 'T09B',
        name: 'Saltwater intrusion // Shape of freshwater-saltwater interface (Glover equation)',
        path: 'tools/T09B/',
        models: [ {
            model_id: '09B_1',
            user_name: 'ADMIN',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A07',
            created_at: '2017-03-09T19:12:00+00:00',
            fake: false
        } ]
    }, {
        slug: 'T09C',
        name: 'Saltwater intrusion // Upconing',
        path: 'tools/T09C/',
        models: [ {
            model_id: '09C_1',
            user_name: 'ADMIN',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A07',
            created_at: '2017-03-09T19:15:00+00:00',
            fake: false
        } ]
    }, {
        slug: 'T09D',
        name: 'Saltwater intrusion // Critical well discharge',
        path: 'tools/T09D/',
        models: [ {
            model_id: '09D_1',
            user_name: 'ADMIN',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A07',
            created_at: '2017-03-09T19:16:00+00:00',
            fake: false
        } ]
    }, {
        slug: 'T13A',
        name: 'Travel time through unconfined aquifer // Aquifer system with a no-flow boundary and fixed head boundary condition and constant groundwater recharge',
        path: 'tools/T13A/',
        models: [ {
            model_id: '13A_1',
            user_name: 'ADMIN',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A04',
            created_at: '2017-03-09T19:18:00+00:00',
            fake: false
        } ]
    }, {
        slug: 'T13B',
        name: 'Travel time through unconfined aquifer // Aquifer system with two fixed head boundary conditions, a flow divide within the system and constant groundwater recharge',
        path: 'tools/T13B/',
        models: [ {
            model_id: '13B_1',
            user_name: 'ADMIN',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A04',
            created_at: '2017-03-09T19:21:00+00:00',
            fake: false
        } ]
    }, {
        slug: 'T13C',
        name: 'Travel time through unconfined aquifer // Aquifer system with two fixed head boundary conditions, a flow divide outside of the system and constant groundwater recharge',
        path: 'tools/T13C/',
        models: [ {
            model_id: '13C_1',
            user_name: 'ADMIN',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A04',
            created_at: '2017-03-09T19:23:00+00:00',
            fake: false
        } ]
    }, {
        slug: 'T13E',
        name: 'Travel time through unconfined aquifer // Aquifer system with one pumping well at constant rate, no groundwater recharge',
        path: 'tools/T13E/',
        models: [ {
            model_id: '13E_1',
            user_name: 'ADMIN',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A04',
            created_at: '2017-03-09T19:24:00+00:00',
            fake: false
        } ]
    },*/ {
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
    }, /*{
        slug: 'T14A',
        name: 'Pumping-induced river drawdown // Fully penetrating stream with no streambed resistance (Jenkins, 1968)',
        path: 'tools/T14A/',
        models: [ {
            model_id: '14A_1',
            user_name: 'ADMIN',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A05',
            created_at: '2017-03-09T19:27:00+00:00',
            fake: false
        } ]
    }, {
        slug: 'T14B',
        name: 'Pumping-induced river drawdown // Fully penetrating stream with semipervious layer (Hantush, 1965)',
        path: 'tools/T14B/',
        models: [ {
            model_id: '14B_1',
            user_name: 'ADMIN',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A05',
            created_at: '2017-03-09T19:28:00+00:00',
            fake: false
        } ]
    }, {
        slug: 'T14C',
        name: 'Pumping-induced river drawdown // Partially penetrating stream with streambed resistance (Hunt, 1999)',
        path: 'tools/T14C/',
        models: [ {
            model_id: '14C_1',
            user_name: 'ADMIN',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A05',
            created_at: '2017-03-09T19:37:00+00:00',
            fake: false
        } ]
    }, {
        slug: 'T14D',
        name: 'Pumping-induced river drawdown // Partially penetrating stream in an aquitard overlying a pumped aquifer (Hunt, 2003)',
        path: 'tools/T14D/',
        models: [ {
            model_id: '14D_1',
            user_name: 'ADMIN',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A05',
            created_at: '2017-03-09T19:38:00+00:00',
            fake: false
        } ]
    }, */{
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
