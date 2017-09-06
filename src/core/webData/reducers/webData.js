import {Action} from "../actions";
import {webData as Selector} from "../selectors";

const webData = ( state = Selector.initialState(), action ) => {

    // TODO ensure uniqueness
    switch ( action.type ) {
        case Action.AT_RESET_WEB_DATA:
            return {
                ...state,
                [action.type]: {}
            };

        case Action.AT_CLEAR_WEB_DATA:
            return {};

        default:
            if ( !action.webData ) {
                return state;
            }

            return {
                ...state,
                [action.type]: action.webData
            };
    }
};

export default webData;
