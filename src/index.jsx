import 'babel-polyfill';
import 'nativeExtensions/date';
import 'nativeExtensions/string';

import { Router, browserHistory } from 'react-router';
import { render, unmountComponentAtNode } from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import React from 'react';
import { StyleRoot } from 'radium';
import configureStore from './store/configureStore';
import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

const root = document.getElementById('root');

const renderApp = () => {
    const routes = require('./routes').default(store);
    render(
        <AppContainer>
            <Provider store={store}>
                <StyleRoot>
                    <Router history={history} routes={routes} />
                </StyleRoot>
            </Provider>
        </AppContainer>,
        root
    );
};

const renderError = error => {
    const RedBox = require('redbox-react');
    render(<RedBox error={error} />, root);
};

renderApp();

if (module.hot) {
    module.hot.accept('./routes', () => {
        unmountComponentAtNode(root);
        try {
            renderApp();
        } catch (error) {
            renderError(error);
        }
    });
}
