import { applyMiddleware, compose, createStore } from 'redux';
// import { autoRehydrate, persistStore } from 'redux-persist';

import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

// middleware always needed
const middleware = [ promiseMiddleware(), thunk ];
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

    return store;
};
