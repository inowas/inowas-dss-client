import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, hashHistory} from "react-router";

window.jQuery = require('jquery');
require('bootstrap');

import Layout from "./pages/Layout";
import Wells from "./pages/Wells";
import ModelOverview from "./components/modelOverview/ModelOverview";

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/mov" component={ModelOverview}/>
    <Route path="/mov/:modelId" component={ModelOverview}/>
    <Route path="/mov/:modelId/:boundaryType" component={ModelOverview}/>
    <Route path="/" component={Layout}>
      <Route path="wells" component={Wells}/>
    </Route>
  </Router>,
  app)
;
