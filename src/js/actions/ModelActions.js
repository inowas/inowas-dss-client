import dispatcher from "../dispatcher";
import axios from "axios";
//import Config from "../config";


export function fetchModels() {
  console.log("ModelActions.fetchModels executed");
  dispatcher.dispatch({
    type: "FETCH_MODEL_LIST"
  });

  axios.get("http://dev.inowas.hydro.tu-dresden.de/api/modflow/models.json")
    .then((returnData) => {
      console.log(returnData);
      dispatcher.dispatch({
        type: "RECEIVE_MODEL_LIST",
        data: returnData.data
      });
    })
}
