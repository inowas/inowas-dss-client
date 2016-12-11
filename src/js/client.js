import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {Router, Route, hashHistory} from "react-router";

import T09A from "./pages/Tools/T09A"
import Modflow from "./pages/ModFlow"
import ModelList from "./pages/ModelList"
import store from "./store";

window.jQuery = require('jquery');
require('bootstrap');

const app = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={ModelList} />
            <Route path="/modflow/list" component={ModelList} />
            <Route path="/modflow/:modelId" component={Modflow} />
            <Route path="/tools/T09A" component={T09A} />
        </Router>
    </Provider>,
    app
);
