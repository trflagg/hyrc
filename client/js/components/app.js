import React from 'react';
import { Provider } from 'react-redux';

import store from '../store';

import style from '../../sass/main.scss';

import HelloString from './helloString';

const App = () => {
  return (
    <Provider store={store}>
      <HelloString />
    </Provider>
  );
}

module.exports = App;
