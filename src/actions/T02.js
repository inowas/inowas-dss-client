export function changeSettings(newVariable) {
    return {
        type: 'CHANGE_TOOL_T02_SETTINGS',
        payload: {
            'variable': newVariable
        }
    }
}

export function changeParameter(parameter){
    return {
        type: 'CHANGE_TOOL_T02_PARAMETER',
        payload: parameter
    }
}

export function calculate(){
    return {
        type: 'CALCULATE_TOOL_T02'
    }
}

export function reset(){
    return {
        type: 'RESET_TOOL_T02'
    }
}
