import ConfiguredAxios from 'ConfiguredAxios';

export function login(username, apiKey) {
    return {
        type: 'LOGIN',
        payload: {
            username,
            apiKey
        }
    };
}

export function authenticate(username, password) {
    return dispatch => {
        return dispatch( {
            type: 'AUTHENTICATION',
            payload: {
                promise: ConfiguredAxios.post('/users/credentials.json', {
                    username,
                    password
                })
            }
        } ).then( ( { action } ) => {
            dispatch( login(username, action.payload.data.api_key) );
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
