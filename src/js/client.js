import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Modflow from "./pages/ModFlow"
import store from "./store";

window.jQuery = require('jquery');
require('bootstrap');

const app = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <Modflow />
    </Provider>,
    app
);
