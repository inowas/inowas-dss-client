import {AT_RESET_WEB_DATA} from "../api/webData";

function initialState () {
    return {};
}

const webData = ( state = initialState(), action ) => {
    if ( !action.webData ) {
        return state;
    }

    // TODO ensure uniqueness
    switch ( action.type ) {
        case AT_RESET_WEB_DATA:
            return {
                ...state,
                [action.type]: {}
            };

        default:
            return {
                ...state,
                [action.type]: action.webData
            };
    }
};

export default webData;

export const getRequestStatus = state => state.webData;
export const isLoading = state => state && state.type === 'loading';
export const hasError = state => state && state.type === 'error';
export const getErrorMessage = state => state.msg;
