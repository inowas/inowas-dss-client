import { combineReducers } from 'redux';
import ui from './ui';
import model from './model';

const T07 = combineReducers({
    model,
    ui
});

export default T07;
