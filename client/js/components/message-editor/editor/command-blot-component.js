import React from 'react';

const CommandBlotComponent = props => {
  return (
    <div>
      Exit:&nbsp;
      <span className='command-exit-name' onClick={() => console.log('click')}>
        {props.exitName}
      </span>
    </div>
  );
}

export default CommandBlotComponent;

