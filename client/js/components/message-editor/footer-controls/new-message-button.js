import React from 'react';

const NewMessageButton = props => {
  return (
    <button onClick={props.onClick}>
      New Message
    </button>
  );
}

export default NewMessageButton;
