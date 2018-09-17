import React from 'react';

require('./message-editor.scss');

import MessageList from './message-list';
import SelectedMessage from './selected-message';
import FooterControls from './footer-controls';

class MessageEditor extends React.Component {
  componentDidMount() {
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

