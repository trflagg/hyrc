import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import { saveMessage, deleteMessage } from '../../../actions/messages';
import { setUseAdvancedEditorAction } from '../../../actions/settings';

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
    if (prevProps.selectedMessageId &&
      this.props.selectedMessageId &&
      prevProps.selectedMessageId !== this.props.selectedMessageId) {
      return this.currentMessage;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      // only save if message changed
      const { messageList, selectedMessageId } = prevProps;
      const prevSelectedMessage = messageList[selectedMessageId];
      if (snapshot.name !== prevSelectedMessage.name ||
        snapshot.text !== prevSelectedMessage.text) {
        this.props.saveMessage(snapshot);
      }
    }

    if (this.editorRef.current && this.props.selectedMessageId) {
      if (this.props.selectedMessageId !== prevProps.selectedMessageId) {
        const selectedMessage = this.props.messageList[this.props.selectedMessageId];
        this.nameInputRef.current.value = selectedMessage.name;
        this.editorRef.current.setText(selectedMessage.text);
      }
    }
  }

  handleSave = () => {
    this.props.saveMessage(this.currentMessage);
  }

  handleDelete = () => {
    const message = this.currentMessage;
    if (confirm(`Are you sure you want to delete message ${message.name}?\n THIS CANNOT BE UNDONE!`)) {
      this.props.deleteMessage(message);
    }
  }

  get currentMessage() {
    return {
      name: this.nameInputRef.current.value,
      text: this.editorRef.current.getText(),
      id: this.idHiddenRef.current.value,
    }
  }

  handleUseAdvancedEditorChanged = (e) => {
    this.props.setUseAdvancedEditor(e.target.checked);
  }

  render() {
    const {
      selectedMessageId,
      messageList,
      useAdvancedEditor,
    } = this.props;

    if (!selectedMessageId) {
      return null;
    }

    const selectedMessage = messageList[selectedMessageId];

    return (
      <SelectedMessage
        selectedMessage={ selectedMessage }
        onSave={ this.handleSave }
        onDelete={ this.handleDelete }
        nameInputRef={ this.nameInputRef }
        editorRef={ this.editorRef }
        idHiddenRef={ this.idHiddenRef }
        useAdvancedEditor={ useAdvancedEditor }
        onUseAdvancedEditorChanged={ this.handleUseAdvancedEditorChanged }
      />
    );
  }
}

const mapStateToProps = state => {
  const { selectedMessageId, messageList } = state.messages;
  const { useAdvancedEditor } = state.settings;
  return {
    selectedMessageId,
    messageList,
    useAdvancedEditor,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    saveMessage: message => dispatch(saveMessage(message)),
    deleteMessage: message => dispatch(deleteMessage(message)),
    setUseAdvancedEditor: useAdvancedEditor =>
      dispatch(setUseAdvancedEditorAction(useAdvancedEditor)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedMessageContainer);
