import axios from "axios";
import store from "../store"
import model from "../modflow_model_example_data";

export function fetchExampleModel() {
    return {
        type: "FETCH_EXAMPLE_MODEL_FULFILLED",
        payload: model
    };
}

export function getModel(id) {
    return {
        type: "FETCH_MODEL",
        payload: axios.get("http://dev.inowas.hydro.tu-dresden.de/api/modflow/models/"+ id +".json")
    }
}

export function fetchAllModels() {
    store.dispatch({
        type: "FETCH_MODELS",
        payload: axios.get("http://dev.inowas.hydro.tu-dresden.de/api/modflow/models.json")
    });
}

export function fetchModelBoundary( id ) {
    store.dispatch({
        type: "FETCH_MODEL_BOUNDARY",
        payload: axios.get("http://dev.inowas.hydro.tu-dresden.de/api/modflow/boundaries/"+ id +".json")
    });
}

export function fetchModelById(id) {
    store.dispatch({
        type: "FETCH_MODEL",
        payload: axios.get("http://dev.inowas.hydro.tu-dresden.de/api/modflow/models/"+ id +".json")
    });
}
