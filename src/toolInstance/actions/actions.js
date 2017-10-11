/**
 * Actions triggers only a store change.
 */

export const SET_TOOL_INSTANCE = 'SET_TOOL_INSTANCE';

export function setToolInstance(tool, payload) {
    return {
        type: SET_TOOL_INSTANCE,
        tool,
        payload
    };
}
