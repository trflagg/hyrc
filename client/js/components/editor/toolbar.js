import React from 'react';

const Toolbar = props => {
  return (
    <div id="toolbar">
      <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
        <option value="1" />
        <option value="2" />
        <option />
      </select>
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-underline"></button>
      <button className="ql-strike"></button>
      <button
        onClick={props.onAddCommandClick}
        className={"argie-toolbar ql-toolbar"}
      >
        Add command
      </button>
    </div>
  );
}

export default Toolbar;
