import * as Dashboard from '../../dashboard';
import {WebData} from '../../core';
import {find} from 'lodash';

export const SETTINGS_CASE_FIXED_TIME = 1;
export const SETTINGS_CASE_VARIABLE_TIME = 2;
export const SETTINGS_INFILTRATION_ONE_TIME = 1;
export const SETTINGS_INFILTRATION_CONTINUOUS = 2;

export const getInitialState = (tool) => {
    return {
        name: 'New simple tool',
        description: 'Simple tool description',
        permissions: 'rwx',
        public: false,
        tool: tool,
        parameters: [{
            order: 0,
            id: 'C0',
            name: 'Initial concentration of the solute, C₀ [mg/l]',
            min: 0.0,
            max: 1000.0,
            value: 725,
            stepSize: 0.01,
            decimals: 3
        }, {
            order: 1,
            id: 'x',
            name: 'Distance from the injection point, x [m]',
            min: 0,
            max: 100,
            value: 15,
            stepSize: 1,
            decimals: 2
        }, {
            order: 2,
            id: 't',
            name: 'Time since injection, t [d]',
            min: 0,
            max: 500,
            value: 365,
            stepSize: 1,
            decimals: 0
        }, {
            order: 3,
            id: 'K',
            name: 'Hydraulic conductivity, K [m/d]',
            min: 1e-2,
            max: 1e+2,
            value: 2.592,
            stepSize: 0.001,
            decimals: 3
        }, {
            order: 4,
            id: 'I',
            name: 'Hydraulic gradient, I [-]',
            min: 0,
            max: 0.01,
            value: 0.002,
            stepSize: 0.001,
            decimals: 3
        }, {
            order: 5,
            id: 'ne',
            name: 'Effective porosity, n [-]',
            min: 0,
            max: 0.5,
            value: 0.23,
            stepSize: 0.01,
            decimals: 2
        }, {
            order: 6,
            id: 'rhoS',
            name: 'Particle density, ρ [g/cc]',
            min: 0,
            max: 3.00,
            value: 2.65,
            stepSize: 0.01,
            decimals: 2
        }, {
            order: 7,
            id: 'alphaL',
            name: 'Longitudinal dispersivity, α [m]',
            min: 0.1,
            max: 10,
            value: 0.923,
            stepSize: 0.001,
            decimals: 3
        }, {
            order: 8,
            id: 'Kd',
            name: 'Sorption partition coefficient, Kd [l/g]',
            min: 0.0,
            max: 0.1,
            value: 0.01,
            stepSize: 0.001,
            decimals: 3
        }, {
            order: 9,
            id: 'tau',
            name: 'Duration of infiltration,  τ  [d]',
            min: 0,
            max: 500,
            value: 100,
            stepSize: 1,
            decimals: 0
        }, {
            order: 10,
            id: 'Corg',
            name: 'Organic carbon content in the soil, Cₒᵣg [-]',
            min: 0,
            max: 0.1,
            value: 0.001,
            stepSize: 0.001,
            decimals: 3
        }, {
            order: 11,
            id: 'Kow',
            name: 'Logarithmus of octanol/water partition coefficient, log Kₒw [-]',
            min: 0,
            max: 10,
            value: 2.25,
            stepSize: 0.001,
            decimals: 3
        }],
        settings: {
            retardation: true,
            case: SETTINGS_CASE_FIXED_TIME,
            infiltration: SETTINGS_INFILTRATION_CONTINUOUS
        }
    };
};

const createReducer = tool => {
    return (state = getInitialState(), action) => {
        if (action.tool !== tool) {
            return state;
        }

        switch (action.type) {
            // eslint-disable-next-line no-case-declarations
            case WebData.Modifier.Action.SET_AJAX_STATUS:
                if (!WebData.Helpers.isSuccess(action)
                    || !WebData.Helpers.waitForResponse(action, Dashboard.Modifier.Query.GET_TOOL_INSTANCE)
                ) {
                    return state;
                }
                const instance = action.webData.data;
                return {
                    ...state,
                    name: instance.name,
                    description: instance.description,
                    permissions: instance.permissions,
                    public: instance.public,
                    settings: instance.data.settings,
                    parameters: state.parameters.map(v => {
                        return {
                            ...v,
                            ...find(instance.data.parameters, {id: v.id})
                        };
                    })
                };
            case Dashboard.Modifier.Action.SET_TOOL_INSTANCE:
            case Dashboard.Modifier.Event.TOOL_INSTANCE_CREATED:
            case Dashboard.Modifier.Event.TOOL_INSTANCE_UPDATED:
                return {
                    ...state,
                    name: action.payload.name,
                    description: action.payload.description,
                    public: action.payload.public,
                    settings: action.payload.data.settings,
                    parameters: state.parameters.map(v => {
                        return {
                            ...v,
                            ...find(action.payload.data.parameters, {id: v.id})
                        };
                    })
                };
        }

        return state;
    };
};

export default createReducer;
