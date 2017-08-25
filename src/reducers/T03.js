import { combineReducers } from 'redux';
import { Reducer } from '../t03/index';

const createModelEditorReducer = tool => {
    return combineReducers({
        model: Reducer.createModelReducer(tool)
    });
};

export default createModelEditorReducer('T03');
