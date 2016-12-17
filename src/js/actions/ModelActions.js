import axios from "../axios";

export function fetchAllModels() {
    return {
        type: "FETCH_MODELS",
        payload: axios.get("/modflow/models.json")
    };
}

export function fetchModelBoundary( id ) {
    return {
        type: "FETCH_MODEL_BOUNDARY",
        payload: axios.get("/modflow/boundaries/"+ id +".json")
    };
}

export function fetchModelMap() {
    return {
        type: "FETCH_MODEL_MAP",
        payload: axios.get("modflow/models/list/map.json")
    };
}

export function fetchModelById(id) {
    return {
        type: "FETCH_MODEL",
        payload: axios.get("/modflow/models/"+ id +".json")
    };
}
