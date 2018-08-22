import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { setAutoFreeze } from 'immer';

import AppContainer from './components/app-container';

// a protective feature of immer
// apparently slows things down, so only enabled in dev
if (process.env.NODE_ENV === 'development') {
  setAutoFreeze(true);
} else {
  setAutoFreeze(false);
}

ReactDOM.render(
  <AppContainer />,
  document.getElementById('root')
);

