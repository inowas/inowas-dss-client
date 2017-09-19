export const initialState = () => {
    return {};
};

export const getRequestStatus = state => state ? state.webData : {};
export const getRequestStatusByType = (state, type) => state.webData && state.webData[type] ? state.webData[type] : null;
export const isLoading = state => state && state.type === 'loading';
export const hasError = state => state && state.type === 'error';
export const getErrorMessage = state => state && state.msg ?  state.msg : null;
export const getType = state => state ? state.type : null;
export const getData= state => state && state.data ? state.data : null;

export const isStatusLoading = (status) => status.status === 'loading';
export const isStatusSuccess = (status) => status.status === 'success';

export const getStatusObject = (state, type) => {
    const request = getRequestStatusByType(state, type);

    if (!state || !request) {
        return {
            status: null,
            errorMessage: null,
            data: null,
        }
    }
    return {
        status: getType(request),
        errorMessage: getErrorMessage(request),
        data: getData(request),
    }
};
