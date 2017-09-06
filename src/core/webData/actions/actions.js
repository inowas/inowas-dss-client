export const AT_RESET_WEB_DATA = 'AT_RESET_WEB_DATA';
export const AT_CLEAR_WEB_DATA = 'AT_CLEAR_WEB_DATA';

export function reset ( responseAction ) {
    return {
        type: AT_RESET_WEB_DATA,
        responseAction
    }
}

export function clear ( ) {
    return {
        type: AT_CLEAR_WEB_DATA
    }
}

export function responseAction ( type, webData ) {
    return {
        type: type,
        webData: webData
    }
}
