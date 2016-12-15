
const initialState = {
    fetching: false,
    fetched: false,
    error: null,
    model: {}
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
        case "FETCH_MODEL_BOUNDARY_PENDING": {
            state = { ...state, fetching: true };
            break;
        }
        case "FETCH_MODEL_BOUNDARY_REJECTED": {
            state = { ...state, fetching: false, errorBoundaries: action.payload };
            break;
        }
        case "FETCH_MODEL_BOUNDARY_FULFILLED": {
            state = {
                ...state,
                fetchingBoundaries: false,
                fetchedBoundaries: true,
            };

            state.model.boundaries = state.model.boundaries.map( b => {
                if (b.id == action.payload.data.id) {
                    return b = action.payload.data;
                }
                return b;
            });
            break;
        }

    }
    return state;
};

export default modelReducer;
