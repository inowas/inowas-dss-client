import {
  EventEmitter
} from "events";
import dispatcher from "../dispatcher";

class ModelDetailStore extends EventEmitter {
  constructor() {
    super();
    this.data = {
      columns: [],
    };
  }
  getData() {
    return this.data;
  }
  handleActions(action) {
    switch (action.type) {
      case "RECEIVE_MODEL_DETAIL_DATA":
        {
          this.data = action.data;
          this.emit("change");
          break;
        }
    }
  }
}
const diagramStore = new DiagramStore;
dispatcher.register(diagramStore.handleActions.bind(diagramStore));
export default diagramStore;
