
const initialState = {
    fetching: false,
    fetched: false,
    model: {},
    error: null
};

const modelReducer = ( state=initialState, action ) => {
    switch (action.type) {
        case "FETCH_MODEL_PENDING": {
            state = { ...state, fetching: true };
            break;
        }
        case "FETCH_MODEL_REJECTED": {
            state = { ...state, fetching: false, error: action.payload };
            break;
        }
        case "FETCH_MODEL_FULFILLED": {
            state = {
                ...state,
                fetching: false,
                fetched: true,
                model: action.payload.data
            };
            break;
        }
        case "FETCH_EXAMPLE_MODEL_FULFILLED": {
            state = {
                ...state,
                fetching: false,
                fetched: true,
                model: action.payload
            };
            break;
        }
    }
    return state;
};

export default modelReducer;
