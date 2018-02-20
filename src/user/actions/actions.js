/**
 * Actions triggers only a store change.
 */
import ConfiguredAxios from 'ConfiguredAxios';
import {getApiKey} from '../reducers';

export const AUTHENTICATION = 'users/AUTHENTICATION';
export const FETCH_USER = 'users/FETCH_USER';
export const LOGIN = 'users/LOGIN';
export const LOGOUT = 'users/LOGOUT';
export const PUT_USER = 'users/PUT_USER';
export const SET_USER = 'users/SET_USER';
export const UNAUTHORIZED = 'users/UNAUTHORIZED_ACCESS';

export function login(username, apiKey) {
    return {
        type: LOGIN,
        payload: {
            username,
            apiKey
        }
    };
}

export function fetchUser() {
    return {
        type: FETCH_USER
    };
}

export function authentication(username, password) {
    return {
        type: AUTHENTICATION,
        username,
        password
    };
}

export function authenticate(username, password) {
    return dispatch => {
        return dispatch({
            type: AUTHENTICATION,
            payload: {
                promise: ConfiguredAxios.post('/users/credentials.json', {
                    username,
                    password
                })
            }
        }).then(({action}) => {
            dispatch(login(username, action.payload.data.api_key));
        }).catch((error) => {
            // eslint-disable-next-line no-console
            console.error(error);
        });
    };
}

export function setUser(userInformation) {
    return {
        type: SET_USER,
        payload: userInformation
    };
}

export function getUser() {
    return (dispatch, getState) => {
        return dispatch({
            type: FETCH_USER,
            payload: {
                promise: ConfiguredAxios.get('/users', {headers: {'X-AUTH-TOKEN': getApiKey(getState().user)}})
            }
        }).then(({action}) => {
            dispatch(setUser(action.payload.data));
        }).catch((error) => {
            // eslint-disable-next-line no-console
            console.error(error);
        });
    };
}

export function putUser(data) {
    return (dispatch, getState) => {
        return dispatch({
            type: PUT_USER,
            payload: {
                promise: ConfiguredAxios.put(
                    '/users', data, {headers: {'X-AUTH-TOKEN': getApiKey(getState().user)}})
            }
        }).then(({action}) => {
            dispatch(setUser(action.payload.data));
        }).catch((error) => {
            // eslint-disable-next-line no-console
            console.error(error);
        });
    };
}

export function logout() {
    return {
        type: LOGOUT
    };
}
