import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, hashHistory} from "react-router";

window.jQuery = require('jquery');
require('bootstrap');

import ModelOverview from "./components/ModelOverview";
import ModFlowMap from "./pages/ModFlowMap";
import Wells from "./pages/Wells";

const app = document.getElementById('app');

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/mov" component={ModelOverview}/>
        <Route path="/mov/:modelId" component={ModelOverview}/>
        <Route path="/mov/:modelId/:boundaryType" component={ModelOverview}/>
        <Route path="/" component={ModFlowMap}>
            <Route path="wells" component={Wells}>
                <Route path=":wellId" component={Wells}/>
            </Route>
        </Route>
    </Router>,
    app
);
