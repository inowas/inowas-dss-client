import {
  EventEmitter
} from "events";
import dispatcher from "../dispatcher";
class DiagramStore extends EventEmitter {
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
      case "RECEIVE_DIAGRAM_DATA":
        {
          this.data.columns.push(['Data ' + (this.data.columns.length + 1)].concat(action.data));
          this.emit("change");
          break;
        }
    }
  }
}
const diagramStore = new DiagramStore;
dispatcher.register(diagramStore.handleActions.bind(diagramStore));
export default diagramStore;
