export function changeInfiltration(newInfilType){
    return {
        type: 'CHANGE_TOOL_T08_INFILTRATION',
        payload: newInfilType
    }
}
export function changeSettings(newSetting){
    return {
        type: 'CHANGE_TOOL_T08_SETTINGS',
        payload: newSetting
    }
}
export function changeParameter(parameter){
    return {
        type: 'CHANGE_TOOL_T08_PARAMETER',
        payload: parameter
    }
}

export function calculate(){
    return {
        type: 'CALCULATE_TOOL_T08'
    }
}

export function reset(){
    return {
        type: 'RESET_TOOL_T08'
    }
}
