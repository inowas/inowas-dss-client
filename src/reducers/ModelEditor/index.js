import { combineReducers } from 'redux';
import createUiReducer from './ui';
import { Reducer } from '../../t03/index';

const createModelEditorReducer = tool => {
    return combineReducers( {
        model: Reducer.createModelReducer(tool),
        ui: createUiReducer( tool ),
    } );
};

export default createModelEditorReducer;
