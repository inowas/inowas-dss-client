import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import * as tools from './pages/tools';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import Modflow from './pages/ModFlow';
import ModelList from './pages/ModelList';
import ScenarioAnalysisList from './pages/ScenarioAnalysisList';
import Main from './pages/Main';
import store from './store';
import ScenarioAnalysis from './pages/ScenarioAnalysis';

window.jQuery = require('jquery');
require('bootstrap');

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target
        .split(search)
        .join(replacement);
};

const app = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/">
            <IndexRoute component={LandingPage}/>
            <Route path="tools" component={Main}>
                <IndexRoute component={Dashboard}/>
                <Route path="modflow/list" component={ModelList}/>
                <Route path="modflow/:modelId" component={Modflow}/>
                <Route path="T02" component={tools.T02}/>
                <Route path="T06" component={tools.T06}/>
                <Route path="T09A" component={tools.T09A}/>
                <Route path="T09B" component={tools.T09B}/>
                <Route path="T09C" component={tools.T09C}/>
                <Route path="T09D" component={tools.T09D}/>
                <Route path="T09E" component={tools.T09E}/>
                <Route path="T13A" component={tools.T13A}/>
                <Route path="T13B" component={tools.T13B}/>
                <Route path="T13C" component={tools.T13C}/>
                <Route path="T13E" component={tools.T13E}/>
                <Route path="T14A" component={tools.T14A}/>
                <Route path="T18" component={tools.T18}/>
                <Route path="scenarioanalysis/list" component={ScenarioAnalysisList}/>
                <Route path="scenarioanalysis/:modelId" component={ScenarioAnalysis}/>
            </Route>
            <Route path="login" component={Login}/>
        </Route>
    </Router>
</Provider>, app);
