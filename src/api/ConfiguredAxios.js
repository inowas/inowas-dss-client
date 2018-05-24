import axios from 'axios';
import config from '../config';

let baseUrl = location.protocol + '//' + 'api.' + location.hostname + (location.port ? ':' + location.port : '');
if (config && config.baseURL) {
    baseUrl = config.baseURL;
}

axios.defaults.baseURL = baseUrl + '/v2';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default axios;
