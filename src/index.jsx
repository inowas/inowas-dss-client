import 'babel-polyfill';

import { Router, browserHistory } from 'react-router';

import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from './store/configureStore';
import { render, unmountComponentAtNode } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';

import 'nativeExtensions/date';
import 'nativeExtensions/string';

const store = configureStore( );
const history = syncHistoryWithStore( browserHistory, store );

const root = document.getElementById( 'root' );

const renderApp = ( ) => {
    const routes = require( './routes' ).default;
    render( (
        <AppContainer>
            <Provider store={store}>
                <Router history={history} routes={routes}/>
            </Provider>
        </AppContainer>
    ), root );
};

renderApp( );

if ( module.hot ) {
    module.hot.accept('./routes', ( ) => {
        unmountComponentAtNode( root );
        renderApp( );
    });
}
