import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const GetGlobalBlot = (props) => {
  return (
    <span>
      {props.globalName}
      {props.editable &&
          <FontAwesomeIcon
            className='edit-icon'
            icon={faEdit}
            size='xs'
          />
      }
    </span>
  );
}

export default GetGlobalBlot;
