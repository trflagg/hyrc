import React from 'react';
import { connect } from 'react-redux';

import { saveMessage } from '../../actions/messages';

import Editor from '../editor';

require('./selected-message.scss');
class SelectedMessage extends React.Component {

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
      prevProps.selectedMessage !== this.props.selectedMessage) {
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

    if (this.editorRef.current) {
      this.nameInputRef.current.value = this.props.selectedMessage.name;
      this.editorRef.current.setText(this.props.selectedMessage.text);
    }
  }

  handleSave = () => {
    this.props.saveMessage(this.currentMessage);
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
    console.log(`render ${JSON.stringify(selectedMessage)}`);
    return (
      <div id='selectedMessage'>
        <input
          ref={ this.idHiddenRef }
          type='hidden'
          value={ selectedMessage.id }
        />
        <div className='field'>
          <p className='field-name'>name</p>
          <input
            ref={ this.nameInputRef }
            className='field-value'
            defaultValue={ selectedMessage.name }
          />
        </div>
        <div className='field'>
          <p className='field-name'>text</p>
          <div className='field-value'>
            <Editor
              ref={this.editorRef}
              defaultValue={selectedMessage.text}
            />
          </div>
        </div>
        <div id="message-button-bar">
          <button
            onClick={this.handleSave}
            disabled={selectedMessage.messageBeingSaved}
          >
            Save Message
          </button>
          {selectedMessage.error &&
          <p className='message-save-error'>
            Error: {selectedMessage.error }
          </p>}
        </div>
      </div>
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
    saveMessage: message => dispatch(saveMessage(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedMessage);
