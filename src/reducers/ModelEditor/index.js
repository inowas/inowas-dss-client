import { combineReducers } from 'redux';
import createUiReducer from './ui';
import createModelReducer from './model';

const createModelEditorReducer = tool => {
    return combineReducers( {
        model: createModelReducer( tool ),
        ui: createUiReducer( tool )
    } );
};

export default createModelEditorReducer;
