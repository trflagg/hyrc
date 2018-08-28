import React from 'react'
import classNames from 'classnames';

import Editor from '../editor';

const Message = ({ message, onClick, selected }) => {
  const classes = classNames({
    'message': true,
    'selected': selected,
  });

  return (
    <div>
      <p className={classes} onClick={onClick}>
        {message.name}
      </p>
      {selected &&
        <Editor
          defaultValue={message.text}
        />
      }
    </div>
  );
};

export default Message;
