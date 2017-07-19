import { applyMiddleware, compose, createStore } from 'redux';

import { browserHistory } from 'react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from '../reducers';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import unauthorizedMiddleware from './unauthorizedMiddleware';
// import { autoRehydrate, persistStore } from 'redux-persist';

import createSagaMiddleware from 'redux-saga'
import rootSaga from '../saga';

const sagaMiddleware = createSagaMiddleware();

// middleware always needed
const middleware = [ sagaMiddleware, promiseMiddleware(), thunk, routerMiddleware( browserHistory ), unauthorizedMiddleware() ];
if ( process.env.NODE_ENV !== 'production' ) {
    // middleware just for developement
    const { logger } = require( 'redux-logger' );
    middleware.push( logger );
}

let configuredCompose = compose;
if ( process.env.NODE_ENV !== 'production' ) {
    // in case of developement permit connection to the devtools browser extension
    configuredCompose = composeWithDevTools;
}

export default ( initialState = {} ) => {
    const store = createStore(
        rootReducer,
        initialState,
        configuredCompose(
            applyMiddleware( ...middleware ),
            // autoRehydrate()
        )
    );

    // persistStore( store, { blacklist: [ 'routing' ] } );

    sagaMiddleware.run(rootSaga);

    return store;
};

