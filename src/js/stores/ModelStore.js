import Axios from "axios";
import EventEmitter from "events";
import Dispatcher from "../dispatcher"

class ModelStore extends EventEmitter {
    constructor() {
        super();
        this.models = [];
        this.activeModel = null;
        this.boundaryTypes = [];
        this.activeBoundaryType = null;
        this.boundaries = [];
        this.activeBoundary = null;
        this.observationPoints = [];
        this.activeObservationPoint = null;
        this.stressPeriods = [];
    }

    getAll() {
        return this.models;
    }

    loadAllModels() {
        Axios.get("http://dev.inowas.hydro.tu-dresden.de/api/modflow/models.json")
            .then((returnData) => {
                this.models = returnData.data;
                this.setActiveModel(this.models[0].id);
                this.emit("change");
            })
    }

    loadAllBoundaryTypesFromModel(id) {
        this.boundaryTypes = ['chd', 'ghb', 'rch', 'riv', 'wel'];
        this.emit("change");
    }

    loadAllBoundariesByModelIdAndType(id, type) {
        Axios.get("http://dev.inowas.hydro.tu-dresden.de/api/modflow/models/" + id + "/boundaries/" + type + ".json")
            .then((returnData) => {
                this.boundaries = returnData.data;
                if (returnData.data.length > 0) {
                    this.setActiveBoundary(returnData.data[0].id);
                }
                this.emit("change");
            })
    }

    loadAllObservationPointsByBoundaryId() {
        const id = this.activeBoundary;
        Axios.get("http://dev.inowas.hydro.tu-dresden.de/api/modflow/boundaries/" + id + "/observationpoints.json")
            .then((returnData) => {
                this.observationPoints = returnData.data;
                if (returnData.data.length > 0) {
                    this.setActiveObservationPoint(returnData.data[0].id);
                }
                this.emit("change");
            })
    }

    loadAllStressPeriodsByObservationPointId() {
        const id = this.activeObservationPoint;
        Axios.get("http://dev.inowas.hydro.tu-dresden.de/api/modflow/observationpoints/" + id + "/stressperiods.json")
            .then((returnData) => {
                this.stressPeriods = returnData.data;
                this.emit("change");
            })
    }

    setActiveModel(id) {
        this.activeModel = id;
        this.loadAllBoundaryTypesFromModel();
        this.emit("change");
    }

    getActiveModel() {
        return this.activeModel;
    }

    getBoundaryTypes() {
        return this.boundaryTypes;
    }

    setActiveBoundaryType(type) {
        this.activeBoundaryType = type;
        this.observationPoints = [];
        this.activeObservationPoint = null;
        this.stressPeriods = [];
        this.boundaries = [];
        this.loadAllBoundariesByModelIdAndType(this.activeModel, this.activeBoundaryType);
        this.emit("change");
    }

    getActiveBoundaryType() {
        return this.activeBoundaryType;
    }

    setActiveBoundary(id) {
        this.activeBoundary = id;
        this.loadAllObservationPointsByBoundaryId();
        this.emit("change");
    }

    getActiveBoundary() {
        return this.activeBoundary;
    }

    getBoundaries() {
        return this.boundaries;
    }

    setActiveObservationPoint(activeObservationPoint) {
        this.activeObservationPoint = activeObservationPoint;
        this.loadAllStressPeriodsByObservationPointId();
        this.emit("change");
    }

    getActiveObservationPoint() {
        return this.activeObservationPoint;
    }

    getObservationPoints() {
        return this.observationPoints;
    }

    getStressPeriods() {
        return this.stressPeriods;
    }

    handleActions(action) {
        switch (action.type) {
            case "LOAD_ALL_MODELS":
                this.loadAllModels();
                break;
            case "LOAD_BOUNDARYTYPES_FROM_MODEL":
                this.loadAllBoundaryTypesFromModel(action.id);
                break;
            case "LOAD_BOUNDARIES_FROM_MODEL":
                this.loadAllBoundariesByModelIdAndType(action.id, action.bType);
                break;
        }
    }
}

const modelStore = new ModelStore;
Dispatcher.register(modelStore.handleActions.bind(modelStore));
window.dispatcher = Dispatcher;
export default modelStore;
