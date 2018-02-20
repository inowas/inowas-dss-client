import {LOGIN, LOGOUT, SET_USER, UNAUTHORIZED} from '../actions/actions';

function initialState() {
    return {
        userName: '',
        name: '',
        apiKey: localStorage.getItem('apiKey'),
        email: '',
        enabled: localStorage.getItem('apiKey') !== null,
        roles: [],
        fetched: false
    };
}

export const user = (state = initialState(), action) => {
    switch (action.type) {
        case LOGIN: {
            localStorage.setItem('apiKey', action.payload.apiKey);
            localStorage.setItem('enabled', action.payload.apiKey);
            return {
                ...state,
                apiKey: action.payload.apiKey,
                enabled: true
            };
        }

        case UNAUTHORIZED:
        case LOGOUT: {
            localStorage.removeItem('apiKey');
            return initialState();
        }

        case SET_USER: {
            return {
                ...state,
                userName: action.payload.user_name || state.userName,
                name: action.payload.name || state.name,
                email: action.payload.email || state.email,
                roles: action.payload.roles || state.roles,
                enabled: action.payload.enabled || state.enabled
            };
        }
        default: {
            return state;
        }
    }
};

export const isUserLoggedIn = state => state.apiKey !== null && state.enabled === true;
export const getApiKey = state => state.apiKey;
export const getEmail = state => state.email;
export const getName = state => state.name;
export const getRoles = state => state.roles;
export const getUserName = state => state.userName;
export const getFetched = state => state.fetched;
export const isAdmin = state => state.roles && Array.isArray(state.roles) && state.roles.includes('ROLE_ADMIN');
