import { combineReducers } from 'redux';
import {Reducer} from '../t03';

const createReducer = tool => {
    return combineReducers({
        model: Reducer.createModelReducer(tool)
    });
};

export {createReducer};
