import { combineReducers } from 'redux';

import appState from "./applicationStateReducer";
import model from "./modelReducer";
import models from "./modelsReducer";
import T09A from "./T09A";
import T09C from "./T09C";

export default combineReducers({
    appState,
    models,
    model,
    T09A,
    T09C,
});
