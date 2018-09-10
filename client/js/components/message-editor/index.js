import React from 'react';
import { connect } from 'react-redux';
const Quill = require('quill/dist/quill.min.js');

import style from '../../../sass/main.scss';

import { fetchAllMessages } from '../../actions/messages';

import argieMod from './editor/argie-quill-module';

import Header from '../header';
import GenericError from '../generic-error';
import MessageList from './message-list';
import SelectedMessage from './selected-message';
import FooterControls from './footer-controls';

class MessageEditor extends React.Component {

  componentDidMount() {
    this.props.fetchAllMessages();
    Quill.register('modules/argieMod', argieMod);
  }

  render() {
    return (
      <div id="pageContainer">
        <Header />
        <div id="content">
          <MessageList />
          <div id="detail">
            <GenericError />
            <SelectedMessage />
          </div>
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

const MessageEditorConnected = connect(null, mapDispatchToProps)(MessageEditor);
export default MessageEditorConnected;

