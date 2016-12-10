export function changeSettings(newSetting) {
    return {
        type: "CHANGE_TOOL_SETTINGS",
        payload: {
            'selected': newSetting
        }
    }
}
