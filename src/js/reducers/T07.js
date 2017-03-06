import ModflowModel from '../model/ModflowModel';

function getInitialState() {
    return {
        area: null,
        gridSize: null,
        boundingBox: null,
        models: []
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

        case 'SET_MODEL_DETAILS':
            state = {...state};
            const modelDetails = action.payload;

            state.area = modelDetails.area;
            state.gridSize = modelDetails.gridSize;
            state.boundingBox = modelDetails.boundingBox;

            let model = new ModflowModel(modelDetails.getId(), modelDetails.isBaseModel);
            model.name = modelDetails.name;
            model.description = modelDetails.description;
            console.log(model);
            state.models.push(model);
            break;
    }

    return state;
};

function findModel(modelId, modelArray) {
    return modelArray.find(model => model.modelId === modelId);
}

export default T07Reducer;
