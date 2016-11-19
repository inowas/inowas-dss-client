import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router";

var jQuery = require('jquery');
window.jQuery = jQuery;
require('bootstrap');

import Diagram from "./pages/Diagram";
import Layout from "./pages/Layout";
import ModFlowMap from "./pages/ModFlowMap";

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
  <Route path="/" component={Layout}>
    <IndexRoute component={ModFlowMap}/>
    <Route path="diagram" component={Diagram}/>
  </Route>
</Router>, app);
