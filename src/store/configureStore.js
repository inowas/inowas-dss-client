import { applyMiddleware, compose, createStore } from 'redux';

import { browserHistory } from 'react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from '../reducers';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import unauthorizedMiddleware from './unauthorizedMiddleware';
// import { autoRehydrate, persistStore } from 'redux-persist';
import SagaManager from '../SagaManager';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

// middleware always needed
const middleware = [
    sagaMiddleware,
    promiseMiddleware(),
    thunk,
    routerMiddleware(browserHistory),
    unauthorizedMiddleware()
];
if (process.env.NODE_ENV !== 'production') {
    // middleware just for developement
    const { logger } = require('redux-logger');
    middleware.push(logger);
}

let configuredCompose = compose;
if (process.env.NODE_ENV !== 'production') {
    // in case of developement permit connection to the devtools browser extension
    configuredCompose = composeWithDevTools;
}

export default (initialState = {}) => {
    const store = createStore(
        rootReducer,
        initialState,
        configuredCompose(
            applyMiddleware(...middleware)
            // autoRehydrate()
        )
    );

    // persistStore( store, { blacklist: [ 'routing' ] } );

    SagaManager.startSagas(sagaMiddleware);

    if (process.env.NODE_ENV !== 'production') {
        // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
        if (module.hot) {
            module.hot.accept('../reducers', () =>
                store.replaceReducer(require('../reducers').default)
            );

            module.hot.accept('../SagaManager', () => {
                SagaManager.cancelSagas(store);
                require('../SagaManager').default.startSagas(sagaMiddleware);
            });
        }
    }

    return store;
};
