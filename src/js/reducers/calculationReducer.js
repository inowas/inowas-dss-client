
const initialState = {
    calculationId: null,
    queued: false,
    calculating: false,
    calculated: false,
    error: null
};

const calculationReducer = ( state=initialState, action ) => {
    switch (action.type) {
        case "ADD_MODEL_TO_CALCULATION_QUEUE_PENDING": {
            state = { ...state };
            break;
        }
        case "ADD_MODEL_TO_CALCULATION_QUEUE_REJECTED": {
            state = { ...state, error: action.payload };
            break;
        }
        case "ADD_MODEL_TO_CALCULATION_QUEUE_FULFILLED": {
            state = {
                ...state,
                queued: true
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

export default calculationReducer;
