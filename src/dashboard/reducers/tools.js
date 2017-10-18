import {Modifier as ToolInstance} from '../../toolInstance';
import {Modifier as T03} from '../../t03';
import {Modifier as T07} from '../../t07';
import {Action} from '../actions';

const ROLE_USER = 'ROLE_USER';
const ROLE_NM_MF = 'ROLE_NM_MF';

const initialState = [
    {
        slug: 'T02',
        name: 'Groundwater mounding (Hantush)',
        path: 'tools/T02/',
        subPath: '',
        role: ROLE_USER,
        instances: []
    }, {
        slug: 'T03',
        name: 'MODFLOW model setup and editor',
        path: 'tools/T03/',
        subPath: '',
        role: ROLE_NM_MF,
        instances: []
    },
    /* {
        slug: 'T06',
        name: 'MAR method selection',
        path: 'tools/T06/',
        subPath: '',
        role: ROLE_USER,
        instances: [ {
            model_id: '06_1',
            user_name: 'ADMIN',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A01',
            created_at: '2017-03-09T18:51:00+00:00',
            fake: false
        } ]}, */
    {
        slug: 'T07',
        name: 'MODFLOW model scenario manager',
        path: 'tools/T07/',
        subPath: '/CrossSection',
        role: ROLE_NM_MF,
        instances: []
    }, {
        slug: 'T08',
        name: ' 1D transport model (Ogata-Banks)',
        path: 'tools/T08/',
        subPath: '',
        role: ROLE_USER,
        instances: [{
            id: 'default',
            model_id: '08',
            user_name: 'ADMIN',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A04',
            created_at: '2017-03-09T19:24:00+00:00',
            fake: false
        }]
    }, {
        slug: 'T09',
        name: 'Simple saltwater intrusion equations',
        path: 'tools/T09/',
        subPath: '',
        role: ROLE_USER,
        instances: [{
            id: 'default',
            model_id: '09',
            user_name: 'ADMIN',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A04',
            created_at: '2017-03-09T19:24:00+00:00',
            fake: false
        }]
    }, {
        slug: 'T13',
        name: 'Travel time through unconfined aquifer',
        path: 'tools/T13/',
        subPath: '',
        role: ROLE_USER,
        instances: [{
            model_id: '13',
            user_name: 'ADMIN',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A04',
            created_at: '2017-03-09T19:24:00+00:00',
            fake: false
        }]
    }, {
        slug: 'T14',
        name: 'Pumping-induced river drawdown',
        path: 'tools/T14/',
        subPath: '',
        role: ROLE_USER,
        instances: [{
            model_id: '14',
            user_name: 'ADMIN',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A04',
            created_at: '2017-03-09T19:24:00+00:00',
            fake: false
        }]
    }, /* {
        slug: 'T16',
        name: 'Calculation of hydraulic conductivity',
        path: 'tools/T16/',
        subPath: '',
        role: ROLE_USER,
        instances: [ {
            model_id: '16',
            user_name: 'ADMIN',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A04',
            created_at: '2017-03-09T19:41:00+00:00',
            fake: false
        } ]
    }, */
    {
        slug: 'T17',
        name: 'Global MAR portal',
        path: 'tools/T17/',
        subPath: '',
        role: ROLE_USER,
        instances: [{
            model_id: '17_1',
            user_name: 'ADMIN',
            name: 'Global MAR portal',
            description: 'Description',
            project: 'INOWAS',
            application: 'A12',
            created_at: '2017-03-09T19:41:00+00:00',
            fake: false
        }]
    }, {
        slug: 'T18',
        name: 'SAT basin design',
        path: 'tools/T18/',
        subPath: '',
        role: ROLE_USER,
        instances: [{
            model_id: '18_1',
            user_name: 'ADMIN',
            name: 'DEFAULT MODEL',
            description: 'Description',
            project: 'INOWAS',
            application: 'A12',
            created_at: '2017-03-09T19:45:00+00:00',
            fake: false
        }]
    }];

const tools = (state = initialState, action) => {
    switch (action.type) {
        case Action.SET_INSTANCES:
            return state.map(t => {
                if (t.slug === action.tool) {
                    return {
                        ...t,
                        instances: action.payload
                    };
                }

                return t;
            });

        case ToolInstance.Event.TOOL_INSTANCE_DELETED:
        case T03.Event.MODFLOW_MODEL_DELETED:
        case T07.Event.SCENARIO_ANALYSIS_DELETED:
            return state.map(t => {
                if (t.slug === action.tool) {
                    return {
                        ...t,
                        instances: [
                            ...t.instances.slice(0, t.instances.findIndex(b => (b.id === action.payload))),
                            ...t.instances.slice(t.instances.findIndex(b => (b.id === action.payload)) + 1, t.instances.length)
                        ]
                    };
                }

                return t;
            });

        default:
            return state;
    }
};

export default tools;
