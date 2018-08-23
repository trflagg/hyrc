import React from 'react'
import classNames from 'classnames';

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
        <div className={'selected'}>
          <textarea
            value={message.text}
          />
        </div>
      }
    </div>
  );
};

export default Message;
