export function changeSettings(newSetting) {
    return {
        type: "CHANGE_TOOL_SETTINGS",
        payload: {
            'selected': newSetting
        }
    }
}

export function changeParameter(parameter){
    return {
        type: "CHANGE_TOOL_PARAMETER",
        payload: parameter
    }
}
