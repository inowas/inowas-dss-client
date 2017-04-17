function initialState() {
    return {
        error: false,
        errorMessage: '',
        username: '',
        apiKey: localStorage.getItem( 'apiKey' )
    };
}

const user = ( state = initialState(), action ) => {
    switch ( action.type ) {
        case 'LOGIN':
            {
                localStorage.setItem( 'apiKey', action.payload.apiKey );
                return {
                    ...state,
                    fetching: false,
                    fetched: true,
                    apiKey: action.payload.apiKey
                };
            }
        case 'LOGOUT':
            {
                localStorage.removeItem( 'apiKey' );
                return initialState();
            }
        default:
            {
                return state;
            }
    }
};

export default user;

export const isUserLoggedIn = state => { return state.user.apiKey !== null; };
export const getApiKey = state => { return state.user.apiKey; };
