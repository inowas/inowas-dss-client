import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Router, Route, hashHistory} from "react-router";

import * as tools from "./pages/tools"

import Login from "./pages/Login"
import Modflow from "./pages/ModFlow"
import ModelList from "./pages/ModelList"
import ScenarioAnalysisList from "./pages/ScenarioAnalysisList"
import Main from "./pages/Main"
import store from "./store";
import ScenarioAnalysis from "./pages/ScenarioAnalysis"

window.jQuery = require('jquery');
require('bootstrap');

const app = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
            <Route path="/modflow/list" component={ModelList}/>
            <Route path="/modflow/:modelId" component={Modflow}/>
            <Route path="/tools/T09A" component={tools.T09A}/>
            <Route path="/tools/T09B" component={tools.T09B}/>
            <Route path="/tools/T09C" component={tools.T09C}/>
            <Route path="/tools/T09D" component={tools.T09D}/>
            <Route path="/tools/T09E" component={tools.T09E}/>
            <Route path="/scenarioanalysis/list" component={ScenarioAnalysisList} />
            <Route path="/scenarioanalysis/:modelId" component={ScenarioAnalysis} />
        </Route>
        <Route path="/login" component={Login}/>
    </Router>
</Provider>, app);
