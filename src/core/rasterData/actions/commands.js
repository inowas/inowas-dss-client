/**
 * Commands sends a request to server and triggers an event.
 */

export const UPLOAD_RASTER_FILE = 'uploadRasterFile';

export function uploadRasterFile(file, width = null, height = null) {
    return {
        type: UPLOAD_RASTER_FILE,
        file,
        width,
        height
    };
}
