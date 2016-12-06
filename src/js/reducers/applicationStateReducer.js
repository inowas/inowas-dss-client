
const initialState = {
    boundaryProperties: null,
    activeBoundaries: {}
};

const applicationStateReducer = ( state=initialState, action ) => {

    switch (action.type) {
        case "SET_BOUNDARY_PROPERTIES": {
            state = {
                ...state,
                boundaryProperties: action.payload
            };
            break;
        }

        case "SET_ACTIVE_BOUNDARY": {
            state = {
                ...state
            };

            state.activeBoundaries[action.bType] = action.id;
            break;
        }
    }

    return state;
};

export default applicationStateReducer;
