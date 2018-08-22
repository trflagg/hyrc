import React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';

import store from '../store';

import style from '../../sass/main.scss';

import Header from './header';
import FooterControls from './footer-controls';

const App = () => {
  return (
    <Provider store={store}>
      <div id="pageContainer">
        <Header />
        <div id="content" />
        <FooterControls />
      </div>
    </Provider>
  );
}

export default hot(module)(App);
