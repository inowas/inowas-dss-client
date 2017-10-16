/**
 * Commands sends a request to server and triggers an event.
 */

export const CREATE_TOOL_INSTANCE = 'createToolInstance';
export const UPDATE_TOOL_INSTANCE = 'updateToolInstance';
export const CLONE_TOOL_INSTANCE = 'cloneToolInstance';
export const DELETE_TOOL_INSTANCE = 'deleteToolInstance';

export function createToolInstance(tool, id, name, description, payload, routes, params) {
    return {
        type: CREATE_TOOL_INSTANCE,
        tool,
        id,
        routes,
        params,
        payload: {
            name,
            description,
            type: tool,
            data: payload
        }
    };
}

export function updateToolInstance(tool, id, name, description, payload) {
    return {
        type: UPDATE_TOOL_INSTANCE,
        tool,
        id,
        payload: {
            name,
            description,
            type: tool,
            data: payload
        }
    };
}

export function cloneToolInstance(tool, baseId, id) {
    return {
        type: CLONE_TOOL_INSTANCE,
        tool,
        id,
        payload: {
            id,
            base_id: baseId
        }
    };
}

export function deleteToolInstance(tool, id) {
    return {
        type: DELETE_TOOL_INSTANCE,
        tool,
        payload: {
            id
        }
    };
}
