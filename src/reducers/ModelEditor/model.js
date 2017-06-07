import { combineReducers } from 'redux';
import createGeneralReducer from './general';
import createBoundariesReducer from './boundaries';

const createModelReducer = tool => {
    const model = combineReducers( {
        general: createGeneralReducer( tool ),
        boundaries: createBoundariesReducer( tool )
    } );

    return model;
};

export default createModelReducer;
