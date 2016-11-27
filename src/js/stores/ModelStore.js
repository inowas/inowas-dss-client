import {
  EventEmitter
} from "events";
import dispatcher from "../dispatcher";
class ModelStore extends EventEmitter {
  constructor() {
    super();
    this.data = {};
  }
  getData() {
    return this.data;
  }
  handleActions(action) {
    console.log(action);
    switch (action.type) {
      case "RECEIVE_MODEL_LIST":
        {
          this.data = action.data;
          console.log("ModelStore.handleActions", this.data);
          this.emit("change");
          break;
        }
    }
  }
}
const modelStore = new ModelStore;
dispatcher.register(modelStore.handleActions.bind(modelStore));
export default modelStore;
