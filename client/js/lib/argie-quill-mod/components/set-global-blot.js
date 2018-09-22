import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import EditableText from './editable-text';

import {
  rangeFromEvent,
  idForClassName,
  nextHighestId,
  idNum,
} from '../utils';

class SetGlobalBlot extends React.Component {
  state = {
    globalName: this.props.defaultGlobalName,
    value: this.props.defaultValue,
    editing: {
      value: false,
      globalName: false,
    },
  };

  constructor(props) {
    super(props);

    const {
      defaultGlobalName,
      defaultValue,
      node,
    } = props;
    const newId = idForClassName('argie-global');
    node.setAttribute('id', newId);
    node.classList.add('argie-tag');
    node.classList.add('argie-global');
    node.setAttribute('contenteditable', 'false');
    node.setAttribute('draggable', 'true');
    node.dataset.globalName = defaultGlobalName;
    node.dataset.value = defaultValue;
    node.addEventListener('dragstart', e => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('id', e.target.id);
      e.dataTransfer.setData('type', 'setGlobal');
      e.dataTransfer.setData('globalName', e.target.dataset.globalName);
      e.dataTransfer.setData('value', e.target.dataset.value);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // went from editing to not editing
    if (prevState.editing && !this.state.editing) {
      this.handleEditComplete();
    }
  }

  handleGlobalEditComplete = (globalName) => {
    this.props.node.dataset.globalName = globalName;
  }

  handleValueEditComplete = (value) => {
    this.props.node.dataset.value = value;
  }

  render() {
    const {
      node,
      defaultGlobalName,
      defaultValue,
    } = this.props;

    return (
      <span
        onClick={this.handleClick}
      >
        SET

        <EditableText
          default={defaultGlobalName}
          onEditComplete={this.handleGlobalEditComplete}
          node={node}
        />

        TO

        <EditableText
          default={defaultValue}
          onEditComplete={this.handleValueEditComplete}
          node={node}
        />
      </span>
    );
  }
}

export default SetGlobalBlot;

