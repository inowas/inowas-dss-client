import { combineReducers } from 'redux';
import { Reducer } from '../t02/index';

const createReducer = tool => {
    return combineReducers({
        toolInstance: Reducer.createReducer(tool)
    });
};

export default createReducer('T02');
