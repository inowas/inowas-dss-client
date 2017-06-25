import ConfiguredAxios from 'ConfiguredAxios';
import { getApiKey } from '../reducers/user';

export function login( username, apiKey ) {
    return {
        type: 'LOGIN',
        payload: {
            username,
            apiKey
        }
    };
}

export function authenticate( username, password ) {
    return dispatch => {
        return dispatch( {
            type: 'AUTHENTICATION',
            payload: {
                promise: ConfiguredAxios.post( '/users/credentials.json', {
                    username,
                    password
                } )
            }
        } ).then( ( { action } ) => {
            dispatch( login( username, action.payload.data.api_key ) );
        } ).catch( ( error ) => {
            // eslint-disable-next-line no-console
            console.error( error );
        } );
    };
}

export function setUserInformation(userInformation) {
    return {
        type: 'USER_SET_INFORMATION',
        payload: userInformation
    };
}

export function loadUserInformation() {
    return (dispatch, getState) => {
        return dispatch({
            type: 'FETCH_DATA',
            payload: {
                promise: ConfiguredAxios.get( '/users/profile', { headers: { 'X-AUTH-TOKEN': getApiKey( getState().user )}})
            }
        }).then( ( { action } ) => {
            dispatch( setUserInformation( action.payload.data ) );
        } ).catch( ( error ) => {
            // eslint-disable-next-line no-console
            console.error( error );
        } );
    };
}

export function logout() {
    return {
        type: 'LOGOUT'
    };
}
