import React from 'react';
import { connect } from 'react-redux';

import { selectMessage } from '../../../actions/messages';

require('./message-list.scss');
import Message from './message';

class MessageList extends React.Component {
  handleMessageClick = message => {
    this.props.selectMessage(message);
  }

  render() {
    const { messageList, selectedMessageId } = this.props;
    return (
      <div id='messageList'>
        {messageList && _.map(messageList, message => (
          <Message
            key={message.id}
            message={message}
            onClick={() => this.handleMessageClick(message)}
            selected={selectedMessageId && selectedMessageId === message.id}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messageList: state.messages.messageList,
    selectedMessageId: state.messages.selectedMessageId,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    selectMessage: message => dispatch(selectMessage(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
