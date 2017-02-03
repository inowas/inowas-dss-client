import { applyMiddleware, createStore } from 'redux';

import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducers from './reducers';

const middleware = composeWithDevTools(applyMiddleware(
    promise(),
    thunk,
    logger()
));

export default createStore( reducers, middleware );
