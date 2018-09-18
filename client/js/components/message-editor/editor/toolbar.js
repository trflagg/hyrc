import React from 'react';

const Toolbar = props => {
  return (
    <div id="toolbar">
      <button
        onClick={props.onFirstNameClick}
        className={"argie-toolbar ql-toolbar"}
      >
        First Name
      </button>
      <button
        onClick={props.onLastNameClick}
        className={"argie-toolbar ql-toolbar"}
      >
       Last Name
      </button>
    </div>
  );
}

export default Toolbar;
