import { combineReducers } from 'redux';
import { Reducer } from '../t07/index';

const createReducer = tool => {
    return Reducer.createReducer(tool);
};

export default createReducer('T07');
