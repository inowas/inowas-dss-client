import axios from 'axios';
import config from '../config';

axios.defaults.baseURL = config.baseURL + '/api';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const ConfiguredAxios = axios;
export default ConfiguredAxios;
