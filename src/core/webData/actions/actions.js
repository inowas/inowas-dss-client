export const AT_RESET_WEB_DATA = 'AT_RESET_WEB_DATA';

export function reset ( responseAction ) {
    return {
        type: AT_RESET_WEB_DATA,
        responseAction
    }
}

export function responseAction ( type, webData ) {
    return {
        type: type,
        webData: webData
    }
}
