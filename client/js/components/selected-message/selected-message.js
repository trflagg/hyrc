import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

import Editor from '../editor';

const SelectedMessage = props => {
  const { selectedMessage,
    onSave,
    onDelete,
    nameInputRef,
    editorRef,
    idHiddenRef
  } = props;

  if (!selectedMessage) {
    return null;
  }

  return (
      <div id='selectedMessage'>
        <input
          ref={ idHiddenRef }
          type='hidden'
          value={ selectedMessage.id }
        />
        <div className='field'>
          <p className='field-name'>name</p>
          <input
            ref={ nameInputRef }
            className={ classNames({
              'field-value': true,
              'error-control': _.get(selectedMessage, 'fieldErrors.name', false),
            })}
            defaultValue={ selectedMessage.name }
          />
          { selectedMessage.fieldErrors &&
            selectedMessage.fieldErrors.name &&
            <p className='error'>
              {selectedMessage.fieldErrors.name}
            </p>
          }
        </div>
        <div className='field'>
          <p className='field-name'>text</p>
          <div className='field-value'>
            <Editor
              ref={ editorRef }
              defaultValue={selectedMessage.text}
            />
          </div>
          { selectedMessage.fieldErrors &&
            selectedMessage.fieldErrors.text &&
            <p className='error'>
              {selectedMessage.fieldErrors.text}
            </p>
          }
        </div>
        <div id="message-button-bar">
          <button
            onClick={onSave}
            disabled={selectedMessage.messageBeingSaved}
          >
            Save Message
          </button>
          <button
            className='deleteButton'
            onClick={onDelete}
          >
            Delete Message
          </button>
        </div>
          {selectedMessage.error &&
          <p className='error'>
            Error: {selectedMessage.error }
          </p>}
      </div>
  );
}

export default SelectedMessage;
