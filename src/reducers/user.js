function initialState() {
    return {
        userName: '',
        name: '',
        apiKey: localStorage.getItem('apiKey'),
        email: '',
        enabled: false,
        roles: []
    };
}

const user = (state = initialState(), action) => {
    switch (action.type) {

        case 'LOGIN': {
            localStorage.setItem('apiKey', action.payload.apiKey);
            return {
                ...state,
                apiKey: action.payload.apiKey,
                enabled: true
            };
        }

        case 'UNAUTHORIZED':
        case 'LOGOUT': {
            localStorage.removeItem('apiKey');
            return initialState();
        }

        case 'USER_SET_INFORMATION': {
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

export default user;

export const isUserLoggedIn = state => state.apiKey !== null && state.enabled === true;
export const getApiKey = state => state.apiKey;
export const getUserName = state => state.userName;
export const getName = state => state.name;
export const getEmail = state => state.email;
