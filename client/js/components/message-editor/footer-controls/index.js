import React from 'react';
import { connect } from 'react-redux';

import { createNewMessage } from '../../../actions/messages';

import NewMessageButton from './new-message-button';

class FooterControls extends React.Component {
  handleNewMessageClick = () => {
    this.props.createNewMessage();
  }

  render() {
    return (
      <footer>
        <NewMessageButton
          onClick={ this.handleNewMessageClick }
        />
      </footer>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createNewMessage: () => dispatch(createNewMessage()),
  }
}

export default connect(null, mapDispatchToProps)(FooterControls);
