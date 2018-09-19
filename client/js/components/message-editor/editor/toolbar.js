import React from 'react';

const Toolbar = props => {
  return (
    <div id="toolbar">
      <button
        onClick={props.onFirstNameClick}
        className={"argie-toolbar ql-toolbar"}
      >
       firstName
      </button>
      <button
        onClick={props.onLastNameClick}
        className={"argie-toolbar ql-toolbar"}
      >
        lastName
      </button>
      <button
        onClick={props.onCustomGlobalClick}
        className={"argie-toolbar ql-toolbar"}
      >
        custom
      </button>
    </div>
  );
}

export default Toolbar;
