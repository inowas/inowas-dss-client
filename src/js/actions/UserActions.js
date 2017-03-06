import axios from '../axios';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export function login(username, password) {
    return {
        type: 'LOGIN',
        payload: axios.post('/users/credentials.json', {
            username: username,
            password: password
        }
        )
    };
}

export function logout() {
    return {
        type: 'LOGOUT'
    };
}
