/**
 * Actions triggers only a store change.
 */
import ConfiguredAxios from 'ConfiguredAxios';
import {getApiKey} from '../reducers';

export const LOGIN = 'session/LOGIN';
export const LOGIN_ERROR = 'session/LOGIN_ERROR';
export const LOGOUT = 'session/LOGOUT';

export const AUTHENTICATION = 'users/AUTHENTICATION';
export const FETCH_USER = 'users/FETCH_USER';
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

export function loginError() {
    return {
        type: LOGIN_ERROR
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

export function setUser(userInformation) {
    return {
        type: SET_USER,
        payload: userInformation
    };
}

export function logout() {
    return {
        type: LOGOUT
    };
}
