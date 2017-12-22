import { createSelector } from 'reselect';
import { WebData } from '../../core';
import { Modifier } from '../../toolInstance';

const getToolInstance = (state, props) => state[props.route.tool].toolInstance;

export const makeGetToolInstance = () => {
    return createSelector(
        [getToolInstance],
        (toolInstance) => toolInstance
    );
};

export const makeMapStateToProps = () => {
    const getToolInstance = makeGetToolInstance();
    const getToolInstanceStatus = WebData.Selector.makeGetStatus(Modifier.Query.GET_TOOL_INSTANCE);
    const updateToolInstanceStatus = WebData.Selector.makeGetStatus(Modifier.Command.UPDATE_TOOL_INSTANCE);
    const createToolInstanceStatus = WebData.Selector.makeGetStatus(Modifier.Command.CREATE_TOOL_INSTANCE);

    return (state, props) => {
        return {
            toolInstance: getToolInstance(state, props),
            getToolInstanceStatus: getToolInstanceStatus(state, props),
            updateToolInstanceStatus: updateToolInstanceStatus(state, props),
            createToolInstanceStatus: createToolInstanceStatus(state, props),
        };
    };
};
