import * as T09A from './T09A';
import * as T09B from './T09B';
import * as T09C from './T09C';
import * as T09D from './T09D';
import * as T09E from './T09E';
import * as ToolInstance from '../../toolInstance';
import {find} from 'lodash';
import {WebData} from '../../core';

export const getInitialState = tool => {
    if (tool === 'T09') {
        return null;
    }

    if (tool === 'T09A') {
        return T09A.getInitialState(tool);
    }

    if (tool === 'T09B') {
        return T09B.getInitialState(tool);
    }

    if (tool === 'T09C') {
        return T09C.getInitialState(tool);
    }

    if (tool === 'T09D') {
        return T09D.getInitialState(tool);
    }

    if (tool === 'T09E') {
        return T09E.getInitialState(tool);
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
                    permissions: instance.permissions,
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
