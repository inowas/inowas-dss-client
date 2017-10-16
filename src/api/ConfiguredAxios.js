import axios from 'axios';
import config from '../config';

axios.defaults.baseURL = config.baseURL + '/v2';
axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded';

const ConfiguredAxios = axios;
export default ConfiguredAxios;

// export default axios.create({
//     baseURL: config.baseURL + '/v2',
//     headers: {
//         post: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//     }
// });
