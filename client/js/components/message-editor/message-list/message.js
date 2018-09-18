import React from 'react'
import classNames from 'classnames';

const Message = ({ message, onClick, selected }) => {
  const classes = classNames({
    'message': true,
    'selected': selected,
    'error': message.error,
  });

  return (
    <div>
      <p className={classes} onClick={onClick}>
        {message.name}
      </p>
    </div>
  );
};

export default Message;
