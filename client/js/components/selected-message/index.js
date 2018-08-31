import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import { saveMessage, deleteMessage } from '../../actions/messages';

import SelectedMessage from './selected-message';

require('./selected-message.scss');
class SelectedMessageContainer extends React.Component {

  constructor(props) {
    super(props);
    this.idHiddenRef = React.createRef();
    this.editorRef = React.createRef();
    this.nameInputRef = React.createRef();
  }

  // if we are switching to a new selected message
  // before we commit the new one to the DOM,
  // save the old one as a snapshot
  getSnapshotBeforeUpdate(prevProps) {
    if (prevProps.selectedMessage &&
      this.props.selectedMessage &&
      prevProps.selectedMessage.id !== this.props.selectedMessage.id) {
      return this.currentMessage;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      // only save if message changed
      if (snapshot.name !== prevProps.selectedMessage.name ||
        snapshot.text !== prevProps.selectedMessage.text) {
        this.props.saveMessage(snapshot);
      }
    }

    if (this.editorRef.current && this.props.selectedMessage) {
      this.nameInputRef.current.value = this.props.selectedMessage.name;
      this.editorRef.current.setText(this.props.selectedMessage.text);
    }
  }

  handleSave = () => {
    this.props.saveMessage(this.currentMessage);
  }

  handleDelete = () => {
    if (confirm(`Are you sure you want to delete message ${this.props.selectedMessage.name}?\n THIS CANNOT BE UNDONE!`)) {
      this.props.deleteMessage(this.currentMessage);
    }
  }


  get currentMessage() {
    return {
      name: this.nameInputRef.current.value,
      text: this.editorRef.current.getText(),
      id: this.idHiddenRef.current.value,
    }
  }

  render() {
    const { selectedMessage } = this.props;

    if (!selectedMessage) {
      return null;
    }

    return (
      <SelectedMessage
        selectedMessage = { selectedMessage }
        onSave = {this.handleSave}
        onDelete = {this.handleDelete}
        nameInputRef = { this.nameInputRef }
        editorRef = { this.editorRef }
        idHiddenRef = { this.idHiddenRef }
      />
    );
  }
}

const mapStateToProps = state => {
  const { selectedMessage } = state.messages;
  return {
    selectedMessage,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    saveMessage: message => dispatch(saveMessage(message)),
    deleteMessage: message => dispatch(deleteMessage(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedMessageContainer);
