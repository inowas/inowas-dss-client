import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import * as tools from './pages/tools';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import Impressum from './pages/Impressum';
import Modflow from './pages/ModFlow';
import ModelList from './pages/ModelList';
import ScenarioAnalysisList from './pages/ScenarioAnalysisList';
import Main from './pages/Main';
import store from './store';
import ScenarioAnalysis from './pages/ScenarioAnalysis';

String.prototype.replaceAll = function(search, replacement) {
    const target = this;
    return target
        .split(search)
        .join(replacement);
};

Date.prototype.addDays = function(days) {
    const dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
};

const app = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/">
            <IndexRoute component={LandingPage}/>
            <Route path="impressum" component={Impressum}/>
            <Route path="tools" component={Main}>
                <IndexRoute component={Dashboard}/>
                <Route path="modflow/list" component={ModelList}/>
                <Route path="modflow/:modelId" component={Modflow}/>
                <Route path="T02(/:id)" component={tools.T02}/>
                <Route path="T06(/:id)" component={tools.T06}/>
                <Route path="T07/:id" component={tools.T07}/>
                <Route path="T09A(/:id)" component={tools.T09A}/>
                <Route path="T09B(/:id)" component={tools.T09B}/>
                <Route path="T09C(/:id)" component={tools.T09C}/>
                <Route path="T09D(/:id)" component={tools.T09D}/>
                <Route path="T09E(/:id)" component={tools.T09E}/>
                <Route path="T13(/:id)" component={tools.T13}/>
                <Route path="T13A(/:id)" component={tools.T13A}/>
                <Route path="T13B(/:id)" component={tools.T13B}/>
                <Route path="T13C(/:id)" component={tools.T13C}/>
                <Route path="T13E(/:id)" component={tools.T13E}/>
                <Route path="T14A(/:id)" component={tools.T14A}/>
                <Route path="T14B(/:id)" component={tools.T14B}/>
                <Route path="T14C(/:id)" component={tools.T14C}/>
                <Route path="T14D(/:id)" component={tools.T14D}/>
                <Route path="T16A(/:id)" component={tools.T16A}/>
                <Route path="T17(/:id)" component={tools.T17}/>
                <Route path="T18(/:id)" component={tools.T18}/>
                <Route path="scenarioanalysis/list" component={ScenarioAnalysisList}/>
                <Route path="scenarioanalysis/:modelId" component={ScenarioAnalysis}/>
            </Route>
            <Route path="login" component={Login}/>
        </Route>
    </Router>
</Provider>, app);
