export function changeMFI(parameter){
    return {
        type: 'CHANGE_TOOL_T12_MFI',
        payload: parameter
    }
}
export function useDataInGraph(parameter){
    return {
        type: 'CHANGE_TOOL_T12_USEDATA',
        payload: parameter
    }
}
export function changeParameter(parameter){
    return {
        type: 'CHANGE_TOOL_T12_PARAMETER',
        payload: parameter
    }
}

export function changeCorrections(parameter){
    return {
        type: 'CHANGE_TOOL_T12_CORRECTIONS',
        payload: parameter
    }
}

export function calculate(){
    return {
        type: 'CALCULATE_TOOL_T12'
    }
}

export function reset(){
    return {
        type: 'RESET_TOOL_T12'
    }
}
