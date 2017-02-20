function getInitialState() {
    return {
        modelList: [],
    };
}

const T07Reducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case 'SET_TOOL_T07_MODEL_LIST':
            state = {
                ...state,
                // TODO
            };
    }
    return state;
};

export default T07Reducer;
