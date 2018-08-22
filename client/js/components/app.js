import React from 'react';
import { connect } from 'react-redux';

import style from '../../sass/main.scss';

import { fetchAllMessages } from '../actions/messages';

import Header from './header';
import MessageList from './message-list';
import FooterControls from './footer-controls';

class App extends React.Component {

  componentDidMount() {
    this.props.fetchAllMessages();
  }

  render() {
    return (
      <div id="pageContainer">
        <Header />
        <div id="content">
          <MessageList />
        </div>
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

