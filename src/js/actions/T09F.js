export function changeSettings(newSetting) {
    return {
        type: "CHANGE_TOOL_T09F_SETTINGS",
        payload: {
            'selected': newSetting
        }
    }
}

export function changeParameter(parameter){
    return {
        type: "CHANGE_TOOL_T09F_PARAMETER",
        payload: parameter
    }
}

export function calculate(){
    return {
        type: "CALCULATE_TOOL_T09F"
    }
}

export function reset(){
    return {
        type: "RESET_TOOL_T09F"
    }
}
