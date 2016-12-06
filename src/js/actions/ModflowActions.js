import dispatcher from "../dispatcher";
import axios from "axios";

export function fetchModels() {

    dispatcher.dispatch({
        type: "FETCH_MODEL_LIST"
    });

    axios.get("http://dev.inowas.hydro.tu-dresden.de/api/modflow/models.json")
        .then((returnData) => {
            dispatcher.dispatch({
                type: "RECEIVE_MODEL_LIST",
                data: returnData.data
            });
        })
}

export function fetchModelDetails(id) {
    dispatcher.dispatch({
        type: "FETCH_MODEL_DETAILS"
    });

    axios.get("http://dev.inowas.hydro.tu-dresden.de/api/modflow/" + id + ".json")
        .then((returnData) => {
            dispatcher.dispatch({
                type: "RECEIVE_MODEL_DETAILS",
                data: returnData.data
            });
        })
}

export function fetchModelBoundaries(id) {
    dispatcher.dispatch({
        type: "FETCH_MODEL_BOUNDARIES_BY_TYPE"
    });

    axios.get("http://dev.inowas.hydro.tu-dresden.de/api/modflow/models/" + id + "/boundaries.json")
        .then((returnData) => {
            dispatcher.dispatch({
                type: "RECEIVE_MODEL_BOUNDARIES",
                data: returnData.data
            });
        })
}

export function fetchModelBoundariesByType(id, type) {
    console.log('fetchModelBoundariesByType:');
    dispatcher.dispatch({
        type: "FETCH_MODEL_BOUNDARIES_BY_TYPE"
    });

    axios.get("http://dev.inowas.hydro.tu-dresden.de/api/modflow/models/" + id + "/boundaries/" + type + ".json")
        .then((returnData) => {
            console.log('Data: fetchModelBoundariesByType:');
            dispatcher.dispatch({
                type: "RECEIVE_MODEL_BOUNDARIES_BY_TYPE",
                data: returnData.data
            });
        })
}

export function fetchObservationPointDetails(id) {
    dispatcher.dispatch({
        type: "FETCH_OBSERVATIONPOINT_DETAILS"
    });

    axios.get("http://dev.inowas.hydro.tu-dresden.de/api/modflow/observationpoint" + id + ".json")
        .then((returnData) => {
            dispatcher.dispatch({
                type: "RECEIVE_OBSERVATIONPOINT_DETAILS",
                data: returnData.data
            });
        })
}
