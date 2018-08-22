import React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';

import store from '../store';

import App from './app';

const AppContainer = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default hot(module)(AppContainer);

