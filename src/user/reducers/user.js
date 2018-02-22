import {SET_USER} from '../actions/actions';

function initialState() {
    return {
        userName: '',
        name: '',
        email: '',
        enabled: true,
        roles: [],
        fetched: false
    };
}

export const user = (state = initialState(), action) => {
    switch (action.type) {
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

export const getEmail = state => state.email;
export const getName = state => state.name;
export const getRoles = state => state.roles;
export const getUserName = state => state.userName;
export const getFetched = state => state.fetched;
export const isAdmin = state => state.roles && Array.isArray(state.roles) && state.roles.includes('ROLE_ADMIN');
