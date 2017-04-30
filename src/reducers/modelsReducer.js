
const initialState = {
    fetching: false,
    fetched: false,
    models: [],
    mapData: null,
    error: null
};

const modelsReducer = ( state=initialState, action ) => {
    switch (action.type) {
        case "FETCH_MODELS_PENDING": {
            state = { ...state, fetching: true };
            break;
        }
        case "FETCH_MODELS_REJECTED": {
            state = { ...state, fetching: false, error: action.payload };
            break;
        }
        case "FETCH_MODELS_FULFILLED": {
            state = {
                ...state,
                fetching: false,
                fetched: true,
                models: action.payload.data
            };
            break;
        }
        case "FETCH_MODEL_MAP_FULFILLED": {
            state = {
                ...state,
                mapData: action.payload.data
            };
            break;
        }
    }
    return state;
};

export default modelsReducer;
