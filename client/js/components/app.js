import React from 'react';
import { connect } from 'react-redux';

import style from '../../sass/main.scss';

import { fetchAllMessages } from '../actions/messages';

import Header from './header';
import MessageList from './message-list';
import FooterControls from './footer-controls';

// for testing only. Will replace with messageList
import Editor from './editor';

class App extends React.Component {

  componentDidMount() {
    this.props.fetchAllMessages();
  }

  render() {
    return (
      <div id="pageContainer">
        <Header />
          <Editor />
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

