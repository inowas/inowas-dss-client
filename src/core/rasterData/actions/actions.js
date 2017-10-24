/**
 * Actions triggers only a store change.
 */
export const SET_RASTERFILE_DATA = 'SET_RASTERFILE_DATA';

export function setRasterFile(hash, metadata, data) {
    return {
        type: SET_RASTERFILE_DATA,
        payload: {hash, metadata, data}
    };
}
