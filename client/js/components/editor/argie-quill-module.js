import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
const Quill = require('quill/dist/quill.min.js');

let Embed = Quill.import('blots/block/embed');
let BlockEmbed = Quill.import('blots/block/embed');

import CommandBlotComponent from './command-blot-component';

class CommandBlot extends BlockEmbed {
  static create() {
    let node = super.create();
    ReactDOM.render(
      <CommandBlotComponent
        exitName='CLICK TO EDIT'
      />,
      node
    );
    const id = `commandBlot_${this.nextHighestId()}`;
    node.setAttribute('id', id);
    node.classList.add('argie-tag');
    node.setAttribute('contenteditable', 'false');
    node.setAttribute('data-text', 'text');
    node.setAttribute('data-message', 'message');
    node.setAttribute('draggable', 'true');
    let thisBlot = this;
    node.addEventListener('dragstart', e => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('id', id);
        const blot = Quill.find(node);
    });
    return node;
  }

  static nextHighestId() {
    const commandBlots = document.getElementsByClassName('argie-command-blot');
    if (commandBlots.length === 0) {
      return 1;
    }
    return _.max(_.map(commandBlots, commandBlot => this.idNum(commandBlot.id))) + 1;
  }

  static idNum(id) {
    return parseInt(id.match(/commandBlot_(\d+)/)[1]) || 0
  }

  length() {
    return 1;
  }

  static value(node) {
    return {
      text: node.getAttribute('data-text'),
      message: node.getAttribute('data-message'),
    };
  }
}
CommandBlot.blotName = 'command';
CommandBlot.tagName = 'div';
CommandBlot.className = 'argie-command-blot';
Quill.register(CommandBlot);

class ArgieModule {
  constructor(quill, options) {

    quill.root.addEventListener('dragover', e => {
      e.preventDefault();
      const range = rangeFromEvent(e, quill);
      quill.setSelection((range.index + 1));
    });

    quill.root.addEventListener('drop', e => {
      e.preventDefault();
      const range = rangeFromEvent(e, quill);
      quill.insertEmbed(range.index, 'command', Quill.sources.USER);
      // remove old
      const id = e.dataTransfer.getData('id');
      const node = document.getElementById(id);
      const oldOffset = Quill.find(node).offset(quill.scroll);
      quill.editor.deleteText(oldOffset, 1, Quill.sources.USER);
      quill.update();
    });
  }
}

export function insertCommandBlot(quill) {
  if (quill) {
    const range = quill.getSelection(true);
    quill.insertText(range.index, '\n', Quill.sources.USER);
    quill.insertEmbed(range.index + 1, 'command', Quill.sources.USER);
    quill.setSelection((range.index + 2));
  }
}

function rangeFromEvent(e, quill) {
  let native;
  if (document.caretRangeFromPoint) {
    native = document.caretRangeFromPoint(e.clientX, e.clientY);
  } else if (document.caretPositionFromPoint) {
    const position = document.caretPositionFromPoint(e.clientX, e.clientY);
    native = document.createRange();
    native.setStart(position.offsetNode, position.offset);
    native.setEnd(position.offsetNode, position.offset);
  } else {
    return;
  }
  const normalized = quill.selection.normalizeNative(native);
  return quill.selection.normalizedToRange(normalized);
}

export default ArgieModule;
