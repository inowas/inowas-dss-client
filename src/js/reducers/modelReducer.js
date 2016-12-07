
const initialState = {
    fetching: false,
    fetched: false,
    error: null,
    model: {},
    fetchingBoundaries: false,
    fetchedBoundaries: false,
    errorBoundaries: null
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
        case "FETCH_MODEL_BOUNDARIES_PENDING": {
            state = { ...state, fetchingBoundaries: true };
            break;
        }
        case "FETCH_MODEL_BOUNDARIES_REJECTED": {
            state = { ...state, fetchingBoundaries: false, errorBoundaries: action.payload };
            break;
        }
        case "FETCH_MODEL_BOUNDARIES_FULFILLED": {
            state = {
                ...state,
                fetchingBoundaries: false,
                fetchedBoundaries: true,
            };

            state.model.boundaries = action.payload.data;
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
