import dispatcher from "../dispatcher";
import axios from "axios";
export function loadData() {

  dispatcher.dispatch({
    type: "FETCH_DIAGRAM_DATA"
  });

  axios.get("http://localhost:80/randomData/1d/")
    .then((returnData) => {
      dispatcher.dispatch({
        type: "RECEIVE_DIAGRAM_DATA",
        data: returnData.data
      });
    })
}
