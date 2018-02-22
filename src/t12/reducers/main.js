import * as ToolInstance from '../../toolInstance';
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
        info: {
            MFI: 0,
            a: 0,
            MFIcor2: 0,
            vc: 0
        },
        mfi: [{
            id: '1',
            t: 10,
            V: 0.25,
            stepSize: 0.1,
            checked: 'true',
            decimals: 2
        }, {
            id: '2',
            t: 23,
            V: 0.5,
            stepSize: 0.1,
            checked: 'true',
            decimals: 2
        }, {
            id: '3',
            t: 35,
            V: 0.75,
            stepSize: 0.1,
            checked: 'true',
            decimals: 2
        }, {
            id: '4',
            t: 48,
            V: 1.0,
            stepSize: 0.1,
            checked: 'true',
            decimals: 2
        }, {
            id: '5',
            t: 0,
            V: 0,
            stepSize: 0.1,
            checked: 'false',
            decimals: 2
        }],
        corrections: [{
            def: 'Volume',
            name: 'V',
            value: 1000,
            stepSize: 0.1,
            unit: 'ml'
        }, {
            def: 'Pressure',
            name: 'P',
            value: 210,
            stepSize: 1,
            unit: 'KPa'
        }, {
            def: 'Filter area',
            name: 'Af',
            stepSize: 0.0001,
            value: 0.00138,
            unit: 'mm2'
        }, {
            def: 'Temperature',
            name: 'T',
            value: 12,
            stepSize: 0.1,
            unit: '°C'
        }, {
            def: 'Filter pore diameter',
            name: 'D',
            value: 0.45,
            stepSize: 0.1,
            unit: 'micrometer'
        }],
        parameters: [{
            order: 0,
            id: 'ueq',
            name: 'Infiltration duration, u<sub>eq</sub>  [h]',
            min: 1,
            validMin: x => x > 0,
            max: 10000,
            value: 5000,
            stepSize: 1,
            decimals: 0
        }, {
            order: 1,
            id: 'IR',
            name: 'Infiltration rate, V<sub>b</sub> [m<sup>3</sup>/d]',
            min: 1,
            validMin: x => x > 0,
            max: 1000,
            value: 100,
            stepSize: 10,
            decimals: 0
        }, {
            order: 2,
            id: 'K',
            name: 'Hydr. conductivity, K [m/d]',
            min: 1,
            validMin: x => x > 0,
            max: 100,
            value: 20,
            stepSize: 1,
            decimals: 0
        }]
    };
};

const createReducer = tool => {
    return (state = getInitialState(), action) => {
        if (action.tool !== tool) {
            return state;
        }

        switch (action.type) {
            case WebData.Modifier.Action.SET_AJAX_STATUS:
                if (!WebData.Helpers.isSuccess(action)
                    || !WebData.Helpers.waitForResponse(action, ToolInstance.Modifier.Query.GET_TOOL_INSTANCE)
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
            case ToolInstance.Modifier.Action.SET_TOOL_INSTANCE:
            case ToolInstance.Modifier.Event.TOOL_INSTANCE_CREATED:
            case ToolInstance.Modifier.Event.TOOL_INSTANCE_UPDATED:
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
