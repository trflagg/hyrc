import React from 'react';

require('./message-editor.scss');

const Quill = require('quill/dist/quill.min.js');
import argieMod from './editor/argie-quill-module';

import MessageList from './message-list';
import SelectedMessage from './selected-message';
import FooterControls from './footer-controls';

class MessageEditor extends React.Component {
  componentDidMount() {
    Quill.register('modules/argieMod', argieMod);
  }

  render() {
    return (
      <div id="message-editor">
        <div className="content">
          <div className="message-master-detail">
            <MessageList />
            <div id="detail">
              <SelectedMessage />
            </div>
          </div>
        </div>
        <FooterControls />
      </div>
    )
  };
}

export default MessageEditor;

