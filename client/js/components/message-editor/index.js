import React from 'react';

import style from '../../../sass/main.scss';

const Quill = require('quill/dist/quill.min.js');
import argieMod from './editor/argie-quill-module';

import Header from '../header';
import GenericError from '../generic-error';
import MessageList from './message-list';
import SelectedMessage from './selected-message';
import FooterControls from './footer-controls';

class MessageEditor extends React.Component {
  componentDidMount() {
    Quill.register('modules/argieMod', argieMod);
  }

  render() {
    return (
      <div className="pageContainer">
        <Header />
        <div className="content">
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

export default MessageEditor;

