/**
 * Events triggers only a store change from a successful command.
 */

export const TOOL_INSTANCE_CREATED = 'toolInstanceCreated';
export const TOOL_INSTANCE_UPDATED = 'toolInstanceUpdated';

export function toolInstanceCreated(tool, id, payload) {
    return {
        type: TOOL_INSTANCE_CREATED,
        tool,
        id,
        payload
    };
}

export function toolInstanceUpdated(tool, id, payload) {
    return {
        type: TOOL_INSTANCE_UPDATED,
        tool,
        id,
        payload
    };
}
