import {WebData} from '../../core';
import * as ToolInstance from '../../toolInstance';
import {find} from 'lodash';

export const getInitialState = () => {
    return {
        name: 'New simple tool',
        description: 'Simple tool description',
        public: false,
        tool: 'T09A',
        parameters: [{
            order: 0,
            id: 'h',
            name: 'Thickness of freshwater above sea level, h [m]',
            min: 0,
            max: 10,
            value: 1,
            stepSize: 0.1,
            decimals: 1
        }, {
            order: 1,
            id: 'df',
            name: 'Density of freshwater [g/cm³]',
            min: 0.9,
            validMin: function(x) {
                return x >= 0.9;
            },
            max: 1.03,
            validMax: function(x) {
                return x <= 1.05;
            },
            value: 1.000,
            stepSize: 0.001,
            decimals: 3
        }, {
            order: 2,
            id: 'ds',
            name: 'Density of saltwater [g/cm³]',
            min: 0.9,
            validMin: function(x) {
                return x >= 0.9;
            },
            max: 1.03,
            validMax: function(x) {
                return x <= 1.05;
            },
            value: 1.025,
            stepSize: 0.001,
            decimals: 3
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
