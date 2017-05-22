import { combineReducers } from 'redux';
import general from './general';
import boundaries from './boundaries';

const model = combineReducers({
    general,
    boundaries
});

export default model;
