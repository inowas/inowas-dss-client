export const initialState = () => {
    return {};
};

export const getRequestStatus = state => state.webData;
export const isLoading = state => state && state.type === 'loading';
export const hasError = state => state && state.type === 'error';
export const getErrorMessage = state => state.msg;
