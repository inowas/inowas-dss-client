import axios from 'axios';
axios.defaults.baseURL = 'https://api.inowas.hydro.tu-dresden.de/api';
const ConfiguredAxios = axios;
export default ConfiguredAxios;
