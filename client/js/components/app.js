import React from 'react';
import { connect } from 'react-redux';
const Quill = require('quill/dist/quill.min.js');

import style from '../../sass/main.scss';

import { fetchAllMessages } from '../actions/messages';

import argieMod from './editor/argie-quill-module';

import Header from './header';
import MessageList from './message-list';
import FooterControls from './footer-controls';

class App extends React.Component {

  componentDidMount() {
    this.props.fetchAllMessages();
    Quill.register('modules/argieMod', argieMod);
  }

  render() {
    return (
      <div id="pageContainer">
        <Header />
        <MessageList />
        <FooterControls />
      </div>
    )
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllMessages: () => { dispatch(fetchAllMessages()) },
  }
}

const AppConnected = connect(null, mapDispatchToProps)(App);
export default AppConnected;

