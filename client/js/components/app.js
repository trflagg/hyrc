import React from 'react';
import { Provider } from 'react-redux';

import store from '../store';

import style from '../../sass/main.scss';

import Header from './header';

const App = () => {
  return (
    <Provider store={store}>
      <Header />
    </Provider>
  );
}

module.exports = App;
