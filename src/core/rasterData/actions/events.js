/**
 * Events triggers only a store change from a successful command.
 */

export const RASTER_FILE_WAS_UPLOADED = 'rasterFileWasUploaded';

export function rasterFileWasUploaded(hash, url) {
    return {
        type: RASTER_FILE_WAS_UPLOADED,
        payload: {hash, url}
    };
}
