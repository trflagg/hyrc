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

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers/index');
    store.replaceReducer(nextRootReducer);
  });
}

export default store;

