import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {Router, Route, hashHistory} from "react-router";

import T09A from "./pages/Tools/T09A"
import T09B from "./pages/Tools/T09B"
import T09C from "./pages/Tools/T09C"
import T09D from "./pages/Tools/T09D"
import T09E from "./pages/Tools/T09E"
import Modflow from "./pages/ModFlow"
import ModelList from "./pages/ModelList"
import NavBar from "./pages/Navbar"
import store from "./store";

window.jQuery = require('jquery');
require('bootstrap');

const app = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={NavBar}>
                <Route path="/modflow/list" component={ModelList} />
                <Route path="/modflow/:modelId" component={Modflow} />
                <Route path="/tools/T09A" component={T09A} />
                <Route path="/tools/T09B" component={T09B} />
                <Route path="/tools/T09C" component={T09C} />
                <Route path="/tools/T09D" component={T09D} />
                <Route path="/tools/T09E" component={T09E} />
            </Route>
        </Router>
    </Provider>,
    app
);
