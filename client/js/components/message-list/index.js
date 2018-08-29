import React from 'react';
import { connect } from 'react-redux';

import { selectMessage } from '../../actions/messages';

require('./message-list.scss');
import Message from './message';

class MessageList extends React.Component {
  handleMessageClick = message => {
    this.props.selectMessage(message);
  }

  render() {
    const { messageList, selectedMessage } = this.props;
    return (
      <div id='messageList'>
        {messageList && _.map(messageList, message => (
          <Message
            key={message.name}
            message={message}
            onClick={() => this.handleMessageClick(message)}
            selected={selectedMessage && selectedMessage.name === message.name}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messageList: state.messages.messageList,
    selectedMessage: state.messages.selectedMessage,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    selectMessage: message => dispatch(selectMessage(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
