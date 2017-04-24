export function setActiveTool(tool) {
    return {
        type: 'T03_UI_SET_ACTIVE_TOOL',
        payload: tool
    };
}

export function setActiveBoundary(boundaryID) {
    return {
        type: 'T03_UI_SET_ACTIVE_BOUNDARY',
        payload: boundaryID
    };
}
