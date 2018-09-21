import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import {
  rangeFromEvent,
  idForClassName,
  nextHighestId,
  idNum,
} from '../utils';


class GetGlobalBlot extends React.Component {
  state = {
    editing: false,
    globalName: this.props.defaultGlobalName,
  };

  constructor(props) {
    super(props);

    const { node, defaultGlobalName, editable } = props;
    const newId = idForClassName('argie-global');
    node.setAttribute('id', newId);
    node.classList.add('argie-tag');
    node.classList.add('argie-global');
    node.setAttribute('contenteditable', 'false');
    node.setAttribute('draggable', 'true');
    node.dataset.globalName = defaultGlobalName;
    node.dataset.editable = editable;
    node.addEventListener('dragstart', e => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('id', e.target.id);
      e.dataTransfer.setData('type', 'getGlobal');
      e.dataTransfer.setData('editable', e.target.dataset.editable);
      e.dataTransfer.setData('globalName', e.target.dataset.globalName);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // went from editing to not editing
    if (prevState.editing && !this.state.editing) {
      this.handleEditComplete();
    }
  }

  handleEditComplete = () => {
    this.props.node.dataset.globalName = this.state.globalName;
  }

  handleClick = () => {
    if (!this.props.editable) {
      return;
    }
    if (!this.state.editing) {
      this.setState({
        editing: true,
      });
    }
  }

  handleBlur = () => {
    this.setState({
      editing: false,
    });
  }

  handleInputChange = e => {
    this.setState({
      globalName: e.target.value,
    });
  }

  render() {
    const {
      editable,
      node,
    } = this.props;

    const {
      editing,
      globalName,
    } = this.state;

    const INPUT_CHAR_WIDTH = 24;
    const inputWidth = globalName.length * INPUT_CHAR_WIDTH;

    // don't allow dragging if editing
    node.setAttribute('draggable', !editing);

    return (
      <span
        onClick={this.handleClick}
      >
        {editing &&
          <input
            type='text'
            value={globalName}
            onChange={this.handleInputChange}
            onBlur={this.handleBlur}
            style={{
              width: inputWidth
            }}
          />
        }
        {!editing &&
          globalName
        }
        {!editing && editable &&
            <FontAwesomeIcon
              className='edit-icon'
              icon={faEdit}
              size='xs'
            />
        }
      </span>
    );
  }
}

export default GetGlobalBlot;
