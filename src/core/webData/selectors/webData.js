export const initialState = () => {
    return {};
};

export const getRequestStatus = state => state ? state.webData : {};
export const getRequestStatusByType = (state, type) => state.webData && state.webData[type] ? state.webData[type] : null;
export const isLoading = state => state && state.type === 'loading';
export const hasError = state => state && state.type === 'error';
export const getErrorMessage = state => state ?  state.msg : null;
export const getType = state => state ? state.type : null;
