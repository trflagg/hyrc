import React from 'react';
import { connect } from 'react-redux';

import Editor from '../editor';

require('./selected-message.scss');
class SelectedMessage extends React.Component {

  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
  }

  componentDidUpdate() {
    if (this.editorRef.current) {
      this.editorRef.current.setText(this.props.selectedMessage.text);
    }
  }

  render() {
    const { selectedMessage } = this.props;
    if (!selectedMessage) {
      return null;
    }
    return (
      <div id='selectedMessage'>
        <div className='field'>
          <p className='field-name'>name</p>
          <input className='field-value' value={ selectedMessage.name } />
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

export default connect(mapStateToProps)(SelectedMessage);
