
const initialState = {
    activeScenario: null,
    baseModel: null,
    scenarios: [],
    fetching: false,
    fetched: false,
    error: false
};

const scenarioAnalysis = ( state=initialState, action ) => {

    switch (action.type) {
        case "FETCH_SCENARIOS_PENDING": {
            state = { ...state, fetching: true };
            break;
        }
        case "FETCH_SCENARIOS_REJECTED": {
            state = { ...state, fetching: false, error: action.payload };
            break;
        }
        case "FETCH_SCENARIOS_FULFILLED": {
            state = {
                ...state,
                fetching: false,
                fetched: true,
                scenarios: action.payload.data,
            };

            if (state.scenarios.length>0){
                state.activeScenario = state.scenarios[0].id
            }

            break;
        }

        case "DUPLICATE_SCENARIO_PENDING": {
            state = { ...state, fetching: true };
            break;
        }
        case "DUPLICATE_SCENARIO_REJECTED": {
            state = { ...state, fetching: false, error: action.payload };
            break;
        }
        case "DUPLICATE_SCENARIO_FULFILLED": {
            state = {
                ...state,
                fetching: false,
                fetched: true,
                scenarios: action.payload.data
            };
            break;
        }

        case "UPDATE_SCENARIO_PENDING": {
            state = { ...state, fetching: true };
            break;
        }
        case "UPDATE_SCENARIO_REJECTED": {
            state = { ...state, fetching: false, error: action.payload };
            break;
        }
        case "UPDATE_SCENARIO_FULFILLED": {
            state = {
                ...state,
                fetching: false,
                fetched: true,
                scenarios: action.payload.data
            };
            break;
        }

        case "DELETE_SCENARIO_PENDING": {
            state = { ...state, fetching: true };
            break;
        }
        case "DELETE_SCENARIO_REJECTED": {
            state = { ...state, fetching: false, error: action.payload };
            break;
        }
        case "DELETE_SCENARIO_FULFILLED": {
            state = {
                ...state,
                fetching: false,
                fetched: true,
                scenarios: action.payload.data
            };
            break;
        }

        case "SET_BASEMODEL": {
            state = {
                ...state,
                baseModel: action.payload
            };
            break;
        }

        case "SET_ACTIVE_SCENARIO": {
            state = {
                ...state,
                activeScenario: action.payload
            };
            break;
        }
    }

    return state;
};

export default scenarioAnalysis;
