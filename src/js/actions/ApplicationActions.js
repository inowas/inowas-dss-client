import store from "../store"

export function showBoundaryProperties(bType) {
    store.dispatch({
        type: "SET_BOUNDARY_PROPERTIES",
        payload: bType
    });

    store.dispatch({
        type: "SET_SELECT_POINT",
            payload: false
        }
    );
}

export function hideBoundaryProperties() {
    store.dispatch({
        type: "SET_BOUNDARY_PROPERTIES",
        payload: null
    });
}

export function setActiveBoundary(bType, id) {
    return {
        type: "SET_ACTIVE_BOUNDARY",
        bType: bType,
        id: id
    };
}

export function setBoundaryData(id) {
    store.dispatch({
        type: "SET_ACTIVE_BOUNDARY",
        bType: bType,
        id: id
    });
}

export function setActiveModel(modelId) {
    store.dispatch({
        type: "SET_ACTIVE_MODEL",
        payload: modelId
    });
}

export function switchToScenarioAnalysisSelect() {
    return {
        type: "SET_SCENARIO_ANALYSIS_SELECT",
        payload: true
    };
}

export function switchToScenarioAnalysisEdit() {
    return {
        type: "SET_SCENARIO_ANALYSIS_SELECT",
        payload: false
    };
}

export function setCurrentTool(name) {
    return {
        type: "SET_CURRENT_TOOL",
        payload: name
    };
}
