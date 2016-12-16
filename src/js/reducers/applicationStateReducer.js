
const initialState = {
    modelId: null,
    scenarioAnalysisSelect: true,
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

        case "SET_ACTIVE_MODEL": {
            state = {
                ...state,
                modelId: action.payload
            };
            break;
        }

        case "SET_SCENARIO_ANALYSIS_SELECT": {
            state = {
                ...state,
                scenarioAnalysisSelect: action.payload
            };
            break;
        }

    }

    return state;
};

export default applicationStateReducer;
