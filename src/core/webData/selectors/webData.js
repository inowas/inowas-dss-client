import { createSelector } from 'reselect'

// TODO needed ?
export const initialState = () => {
    return {};
};

export const getRequestStatus = state => (state ? state.webData : {});
export const getRequestStatusByType = (state, type) =>
    state.webData && state.webData[type] ? state.webData[type] : null;

// REVIEW shouldn't this be methods of an ajax request staus object?
export const isLoading = state => state && state.type === 'loading';
export const hasError = state => state && state.type === 'error';
export const getErrorMessage = state => (state && state.msg ? state.msg : null);
export const getType = state => (state ? state.type : null);
export const getData = state => (state && state.data ? state.data : null);
export const isStatusLoading = status => status.status === 'loading';
export const isStatusSuccess = status => status.status === 'success';

export const getStatusObject = (state, provokingActionType) => {
    const request = getRequestStatusByType(state, provokingActionType);

    if (!state || !request) {
        return {
            status: null,
            errorMessage: null,
            data: null
        };
    }
    return {
        status: getType(request),
        errorMessage: getErrorMessage(request),
        data: getData(request)
    };
};

const getStatusForSelector = ( type ) => (state, props) => getStatusObject(state, type);

export const makeGetStatus = (type) => {
    return createSelector(
        [getStatusForSelector(type)],
        (status) => status
    );
};

