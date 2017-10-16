export const AT_RESET_WEB_DATA = 'AT_RESET_WEB_DATA';
export const AT_CLEAR_WEB_DATA = 'AT_CLEAR_WEB_DATA';

export function reset(provokingActionType) {
    return {
        type: AT_RESET_WEB_DATA,
        provokingActionType
    };
}

export function clear() {
    return {
        type: AT_CLEAR_WEB_DATA
    };
}

export const SET_AJAX_STATUS = 'SET_AJAX_STATUS';

export function setAjaxStatus(provokingActionType, status, tool) {
    return {
        type: SET_AJAX_STATUS,
        provokingActionType,
        status,
        tool,
        webData: status // legacy
    };
}
// legacy
export function responseAction(provokingActionType, status, tool) {
    return setAjaxStatus(provokingActionType, status, tool);
}
