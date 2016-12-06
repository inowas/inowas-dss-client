import store from "../store"

export function showBoundaryProperties(bType) {
    store.dispatch({
        type: "SET_BOUNDARY_PROPERTIES",
        payload:  bType
    });
}

export function hideBoundaryProperties() {
    store.dispatch({
        type: "SET_BOUNDARY_PROPERTIES",
        payload: null
    });
}

export function setActiveBoundary(bType, id) {
    store.dispatch({
        type: "SET_ACTIVE_BOUNDARY",
        bType: bType,
        id: id
    });
}
