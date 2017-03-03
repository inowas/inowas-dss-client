function getInitialState() {
    return {
        fetching: false,
        error: false,
        fetched: false,
        username: "",
        apiKey: localStorage.getItem('api_key')
    }
}

const userReducer = ( state=getInitialState(), action ) => {

    switch (action.type) {
        case "LOGIN_PENDING": {
            state = { ...state, fetching: true };
            break;
        }
        case "LOGIN_REJECTED": {
            state = { ...state, fetching: false, error: action.payload };
            break;
        }
        case "LOGIN_FULFILLED": {
            state = {
                ...state,
                fetching: false,
                fetched: true,
                apiKey: action.payload.data.api_key
            };

            localStorage.setItem('api_key', action.payload.data.api_key);
            break;
        }
        case "LOGOUT": {
            localStorage.clear();
            state = getInitialState();
        }
    }

    return state;
};

export default userReducer;
