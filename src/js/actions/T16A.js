export function changeParameter(parameter){
    return {
        type: 'CHANGE_TOOL_T16A_PARAMETER',
        payload: parameter
    }
}

export function calculate(){
    return {
        type: 'CALCULATE_TOOL_T16A'
    }
}

export function reset(){
    return {
        type: 'RESET_TOOL_T16A'
    }
}
