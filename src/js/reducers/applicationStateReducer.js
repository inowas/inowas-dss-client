
const initialState = {
    tool: null,
    modelId: null,
    scenarioAnalysisSelect: true,
    modflowToolBox: false,
    boundaryProperties: false,
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

        case "SET_MODFLOW_TOOLBOX": {
            state = {
                ...state,
                modflowToolBox: action.payload
            };
            break;
        }

        case "SET_SCENARIO_ANALYSIS_SELECT": {
            state = {
                ...state,
                scenarioAnalysisSelect: action.payload,
                modflowToolBox: !action.payload
            };

            break;
        }

        case "SET_CURRENT_TOOL":{
            state = {
                ...state,
                tool: action.payload
            };

            if (state.tool == 'modflow'){
                state.scenarioAnalysisSelect = false;
                state.modflowToolBox = true;
            }

            if (state.tool == 'scenarioanalysis'){
                state.scenarioAnalysisSelect = true;
                state.modflowToolBox = false;
            }

            break;
        }
    }

    return state;
};

export default applicationStateReducer;
