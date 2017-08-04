export const GET_MODFLOW_MODEL = 'GET_MODFLOW_MODEL';

export function getModflowModel ( tool, id ) {
    return {
        type: GET_MODFLOW_MODEL,
        tool,
        id
    };
}
