import { Action, Event } from '../actions/index';

const initialState = {
    files: [],
    current: null
};

const createRasterfileReducer = () => {
    return (state = initialState, action) => {

        switch (action.type) {
            case Event.RASTER_FILE_WAS_UPLOADED:
                return {
                    ...state,
                    current: action.payload.hash
                };

            case Action.SET_RASTERFILE_DATA:
                const files = state.files;
                if (files.filter( e => e.hash === action.payload.hash).length > 0) {
                    return state;
                }

                files.push(action.payload);

                return {
                    ...state, files
                };

            default:
                return state;
        }
    };
};

export default createRasterfileReducer;
