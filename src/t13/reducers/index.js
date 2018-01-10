import * as T13A from './T13A';
import * as T13B from './T13B';
import * as T13C from './T13C';
import * as ToolInstance from '../../toolInstance';
import {find} from 'lodash';
import {WebData} from '../../core';

export const getInitialState = tool => {
    if (tool === 'T13') {
        return null;
    }

    if (tool === 'T13A') {
        return T13A.getInitialState(tool);
    }

    if (tool === 'T13B') {
        return T13B.getInitialState(tool);
    }

    if (tool === 'T13C') {
        return T13C.getInitialState(tool);
    }

    return null;
};

export const createReducer = tool => {
    return (state = getInitialState(tool), action) => {
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
                    }),
                    tool: instance.data.tool
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
                    }),
                    tool: action.payload.data.tool
                };
        }

        return state;
    };
};
