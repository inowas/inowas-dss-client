export const CREATE_MODFLOW_MODEL = 'createModflowModel';
export const DELETE_MODFLOW_MODEL = 'deleteModflowModel';
export const UPDATE_MODFLOW_MODEL = 'updateModflowModel';


export const REMOVE_BOUNDARY = 'removeBoundary';

export function createModflowModel ( tool, id, payload ) {
    return {
        type: CREATE_MODFLOW_MODEL,
        tool,
        id,
        payload
    };
}

export function updateModflowModel ( tool, id, payload ) {
    return {
        type: UPDATE_MODFLOW_MODEL,
        tool,
        id,
        payload
    };
}


export function removeBoundary ( tool, boundaryId, modelId ) {
    return {
        type: REMOVE_BOUNDARY,
        tool,
        payload: {
            boundary_id: boundaryId,
            id: modelId,
        }
    };
}
