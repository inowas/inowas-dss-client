import T03 from './T03';
import T02 from './T02';
import T06 from './T06';
import { Reducer as T07 } from '../t07';
import T07E from './T07E';
import * as T08 from '../t08/reducers';
import * as T09 from '../t09/reducers';
import T12 from './T12';
import T13A from './T13A';
import T13B from './T13B';
import T13C from './T13C';
import T13D from './T13D';
import T13E from './T13E';
import * as T14 from '../t14/reducers';
import T16 from './T16';
import T18 from './T18';
import { combineReducers } from 'redux';
import dashboard from '../dashboard/reducers';
import rasterfiles from './Rasterfiles';
import { routerReducer as routing } from 'react-router-redux';
import user from './user';
import { WebData } from '../core';

const rootReducer = combineReducers({
    routing,
    user,
    webData: WebData.Reducer.webData,
    dashboard,
    rasterfiles,
    T02,
    T03,
    T06,
    T07,
    T07E,
    T08: T08.createReducer('T08'),
    T09A: T09.createReducer('T09A'),
    T09B: T09.createReducer('T09B'),
    T09C: T09.createReducer('T09C'),
    T09D: T09.createReducer('T09D'),
    T09E: T09.createReducer('T09E'),
    T12,
    T13A,
    T13B,
    T13C,
    T13D,
    T13E,
    T14A: T14.createReducer('T14A'),
    T14B: T14.createReducer('T14B'),
    T14C: T14.createReducer('T14C'),
    T14D: T14.createReducer('T14D'),
    T16,
    T18
});

export default rootReducer;
