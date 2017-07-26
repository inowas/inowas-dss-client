function initialState() {
    return {};
}

const webData = ( state = initialState(), action ) => {
    if (!action.webData) {
        return state;
    }

    // TODO ensure uniqueness

    return {
        ...state,
        [action.type]: action.webData
    };
};

export default webData;

export const getRequestStatus = state => state.webData;
export const isLoading = state => state && state.type === 'loading';
