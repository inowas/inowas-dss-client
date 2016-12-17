
const initialState = {
    fetching: false,
    error: false,
    fetched: false,
    username: "",
    apiKey: ""
};

const userReducer = ( state=initialState, action ) => {

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
            break;
        }
    }

    return state;
};

export default userReducer;
