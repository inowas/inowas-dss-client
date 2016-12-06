import { combineReducers } from 'redux';

import appState from "./applicationStateReducer";
import model from "./modelReducer";
import models from "./modelsReducer";

export default combineReducers({
    appState,
    models,
    model
});
