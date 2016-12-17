import axios from "axios";
import store from "./store";
axios.defaults.baseURL = 'http://dev.inowas.hydro.tu-dresden.de/api';
export default axios;
