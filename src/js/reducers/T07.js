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

        case 'SET_MODEL_DETAILS':
            state = {...state};

            const modelDetails = action.payload;
            state.models.push(ModflowModel.fromModflowDetails(modelDetails));

            if (modelDetails.isBaseModel){
                state.area = modelDetails.area;
                state.gridSize = modelDetails.gridSize;
                state.boundingBox = modelDetails.boundingBox;
            }

            break;

        case 'SET_MODEL_BOUNDARIES':
            const modelId = action.payload.modelId;
            state = {...state};
            state.models.map( m => {
                if (m.modelId === modelId){
                    m.boundaries = action.payload.boundaries;
                    return m;
                }
            });

            break;
    }

    return state;
};

export default T07Reducer;
