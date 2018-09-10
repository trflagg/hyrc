import React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';

import store from '../store';

import MessageEditor from './message-editor';

const AppContainer = () => {
  return (
    <Provider store={store}>
      <MessageEditor />
    </Provider>
  );
}

export default hot(module)(AppContainer);

