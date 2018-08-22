import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';

let middleware = [thunk];
if (process.env.NODE_ENV === 'development') {
  const logger = require('redux-logger').default;
  middleware = [...middleware, logger];
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

export default store;

