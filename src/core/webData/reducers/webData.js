import {Action} from "../actions";
import {webData as Selector} from "../selectors";

const webData = ( state = Selector.initialState(), action ) => {
    if ( !action.webData ) {
        return state;
    }

    // TODO ensure uniqueness
    switch ( action.type ) {
        case Action.AT_RESET_WEB_DATA:
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
