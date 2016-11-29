import EventEmitter from "events";
import axios from "axios";

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

  loadAllModels(){
    axios.get("http://dev.inowas.hydro.tu-dresden.de/api/modflow/models.json")
      .then((returnData) => {
        this.models = returnData.data;
        this.setActiveModel(this.models[0].id);
        this.emit("change");
      })
  }

  loadAllBoundaryTypesFromModel(){
    this.boundaryTypes = ['chd', 'ghb', 'rch', 'riv', 'wel'];
    this.emit("change");
  }

  loadAllBoundariesByModelIdAndType(){
    const id = this.activeModel;
    const type = this.activeBoundaryType;

    axios.get("http://dev.inowas.hydro.tu-dresden.de/api/modflow/models/"+ id +"/boundaries/"+ type +".json")
      .then((returnData) => {
        this.boundaries = returnData.data;

        if (returnData.data.length > 0){
          this.setActiveBoundary(returnData.data[0].id);
        }

        this.emit("change");
      })
  }

  loadAllObservationPointsByBoundaryId(){
    const id = this.activeBoundary;

    axios.get("http://dev.inowas.hydro.tu-dresden.de/api/modflow/boundaries/"+ id +"/observationpoints.json")
      .then((returnData) => {
        this.observationPoints = returnData.data;

        if (returnData.data.length > 0){
          this.setActiveObservationPoint(returnData.data[0].id);
        }
        this.emit("change");
      })
  }

  loadAllStressPeriodsByObservationPointId(){
    const id = this.activeObservationPoint;

    axios.get("http://dev.inowas.hydro.tu-dresden.de/api/modflow/observationpoints/"+ id +"/stressperiods.json")
      .then((returnData) => {
        this.stressPeriods = returnData.data;
        this.emit("change");
      })
  }

  setActiveModel(id){
    this.activeModel = id;
    this.loadAllBoundaryTypesFromModel();
    this.emit("change");
  }

  getActiveModel(){
    return this.activeModel;
  }

  getBoundaryTypes(){
    return this.boundaryTypes;
  }

  setActiveBoundaryType(type){
    this.activeBoundaryType = type;
    this.observationPoints = [];
    this.activeObservationPoint = null;
    this.stressPeriods = [];
    this.boundaries = [];
    this.loadAllBoundariesByModelIdAndType();
    this.emit("change");
  }

  getActiveBoundaryType(){
    return this.activeBoundaryType;
  }

  setActiveBoundary(id){
    this.activeBoundary = id;
    this.loadAllObservationPointsByBoundaryId();
    this.emit("change");
  }

  getActiveBoundary(){
    return this.activeBoundary;
  }

  getBoundaries(){
    return this.boundaries;
  }

  setActiveObservationPoint(activeObservationPoint){
    this.activeObservationPoint = activeObservationPoint;
    this.loadAllStressPeriodsByObservationPointId();
    this.emit("change");
  }

  getActiveObservationPoint(){
    return this.activeObservationPoint;
  }

  getObservationPoints(){
    return this.observationPoints;
  }

  getStressPeriods(){
    return this.stressPeriods;
  }

  handleActions(action) {
    switch (action.type) {
      case "RECEIVE_MODEL_LIST": {
        this.models = action.data;
        this.emit("change");
        break;
      }
    }
  }
}

const modelStore = new ModelStore;
export default modelStore;
