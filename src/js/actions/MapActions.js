import store from "../store"

export function enableMap() {
    store.dispatch({
        type: "ENABLE_MAP"
    });
}

export function disableMap() {
    store.dispatch({
        type: "DISABLE_MAP"
    });
}
