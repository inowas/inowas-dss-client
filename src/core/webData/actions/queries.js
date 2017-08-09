export const AT_SEND_HTTP_REQUEST = 'AT_SEND_HTTP_REQUEST';

export const GET_MODFLOW_MODEL = 'GET_MODFLOW_MODEL';

export function sendHttpRequest ( request, responseAction ) {
    return {
        type: AT_SEND_HTTP_REQUEST,
        request,
        responseAction
    }
}
