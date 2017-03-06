import { ModflowBasemodel, ModflowScenario } from '../model/ModflowModel'

function getInitialState(id) {
    return {
        area: null,
        gridSize:  null,
        boundingBox: null,
        models: [
            ModflowBasemodel(id)
        ]
    };
}

const T07Reducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case 'SET_TOOL_T07_MODEL_LIST':
            state = {...state};
            break;

        case 'SET_TOOL_T07_BASE_MODEL_ID':
            state = getInitialState(action.baseModelId);
            break;

        case 'FETCH_MODEL_DETAILS_FULFILLED':
            state = {...state};
            state.area = action.payload.area;
            state.gridSize = action.payload.grid_size;
            state.boundingBox = action.payload.bounding_box;

            let model = findModel(action.payload.modelId, state.models);

            if (model instanceof ModflowBasemodel || model instanceof ModflowScenario){
                model.name = action.payload.name;
                model.description = action.payload.description;
            }

            break;

        case "FETCH_MODEL_BOUNDARIES_FULFILLED": {
            state = {...state};
            let model = findModel(action.payload.modelId, state.models);
            model.boundaries = action.payload.boundaries;
            break;
        }
    }

    return state;
};

function findModel(modelId, modelArray) {
    return modelArray.find(model => model.modelId === modelId);
}

export default T07Reducer;
