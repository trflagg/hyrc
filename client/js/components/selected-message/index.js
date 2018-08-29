import React from 'react';
import { connect } from 'react-redux';

import { saveMessage } from '../../actions/messages';

import Editor from '../editor';

require('./selected-message.scss');
class SelectedMessage extends React.Component {

  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
    this.nameInputRef = React.createRef();
  }

  componentDidUpdate() {
    if (this.editorRef.current) {
      this.nameInputRef.current.value = this.props.selectedMessage.name;
      this.editorRef.current.setText(this.props.selectedMessage.text);
    }
  }

  handleSave = () => {
    this.props.saveMessage({
      name: this.nameInputRef.current.value,
      text: this.editorRef.current.getText(),
    });
  }

  render() {
    const { selectedMessage,
      messageBeingSaved,
      messageSaveError,
    } = this.props;

    if (!selectedMessage) {
      return null;
    }
    return (
      <div id='selectedMessage'>
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
          <button onClick={this.handleSave} disabled={messageBeingSaved} >
            Save Message
          </button>
          {messageSaveError &&
          <p className='message-save-error'>
            Error: {messageSaveError }
          </p>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { selectedMessage,
    messageBeingSaved,
    messageSaveError } = state.messages;

  return {
    selectedMessage,
    messageBeingSaved,
    messageSaveError,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    saveMessage: message => dispatch(saveMessage(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedMessage);
