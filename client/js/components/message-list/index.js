import React from 'react';
import { connect } from 'react-redux';

import Message from './message';

class MessageList extends React.Component {
  render() {
    const { messageList } = this.props;
    return (
      <div>
        {messageList && messageList.map(message => (
          <Message key={message.name} message={message} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = props => {
  return {
    messageList: props.messages.messageList,
  };
}

export default connect(mapStateToProps)(MessageList);
