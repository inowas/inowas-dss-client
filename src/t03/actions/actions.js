export const SET_MODFLOW_MODEL = 'MODEL_EDITOR_MODEL_SET';
export const DESTROY_MODFLOW_MODEL = 'MODEL_EDITOR_MODEL_DESTROY';

export function setModflowModel ( tool, payload ) {
    return {
        type: SET_MODFLOW_MODEL,
        tool,
        payload
    };
}

export function destroyModflowModel ( tool ) {
    return {
        type: DESTROY_MODFLOW_MODEL,
        tool
    };
}


export const SET_BOUNDARIES = 'MODEL_EDITOR_MODEL_SET_BOUNDARIES';

export function setBoundaries ( tool, boundaries ) {
    return {
        type: SET_BOUNDARIES,
        tool,
        payload: boundaries
    };
}
