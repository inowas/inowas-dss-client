import * as T03 from './T03';
import * as T02 from '../t02/reducers';
import * as T06 from '../t06/reducers';
import {Reducer as T07} from '../t07';
import T07E from './T07E';
import * as T08 from '../t08/reducers';
import * as T09 from '../t09/reducers';
import * as T12 from '../t12/reducers';
import * as T13 from '../t13/reducers';
import * as T14 from '../t14/reducers';
import T16 from './T16';
import T18 from './T18';
import {combineReducers} from 'redux';
import dashboard from '../dashboard/reducers';
import rasterfiles from './Rasterfiles';
import {routerReducer as routing} from 'react-router-redux';
import {WebData} from '../core';
import {user, session} from '../user/reducers';

const rootReducer = combineReducers({
    routing,
    session,
    user,
    webData: WebData.Reducer.webData,
    dashboard,
    rasterfiles,
    T02: T02.createReducer('T02'),
    T03: T03.createReducer('T03'),
    T06: T06.createReducer('T06'),
    T07,
    T07E,
    T08: T08.createReducer('T08'),
    T09A: T09.createReducer('T09A'),
    T09B: T09.createReducer('T09B'),
    T09C: T09.createReducer('T09C'),
    T09D: T09.createReducer('T09D'),
    T09E: T09.createReducer('T09E'),
    T12: T12.createReducer('T12'),
    T13A: T13.createReducer('T13A'),
    T13B: T13.createReducer('T13B'),
    T13C: T13.createReducer('T13C'),
    T13D: T13.createReducer('T13D'),
    T13E: T13.createReducer('T13E'),
    T14A: T14.createReducer('T14A'),
    T14B: T14.createReducer('T14B'),
    T14C: T14.createReducer('T14C'),
    T14D: T14.createReducer('T14D'),
    T16,
    T18
});

export default rootReducer;
