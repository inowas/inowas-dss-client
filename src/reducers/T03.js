import { combineReducers } from 'redux';
import { createModelReducer } from '../t03/reducers';

const createModelEditorReducer = tool => {
    return combineReducers({
        model: createModelReducer(tool)
    });
};

export default createModelEditorReducer('T03');
