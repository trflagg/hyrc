import * as _ from  'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
const QuillScript = require('quill/dist/quill.min.js');
const InlineEmbed = QuillScript.import('blots/embed');

import { Quill, RangeStatic } from 'quill';
import GlobalEmbedComponent from './global-embed';

class ArgieModule {
  constructor(quill, options) {
    quill.root.addEventListener('dragover', e => {
      e.preventDefault();
      const range = rangeFromEvent(e, quill);
      quill.setSelection((range.index + 1), 0);
    });

    quill.root.addEventListener('drop', e => {
      e.preventDefault();
      const range = rangeFromEvent(e, quill);
      const type = e.dataTransfer.getData('type');
      let args = '';

      if (type === 'global') {
        args = e.dataTransfer.getData('globalName');
      }

      quill.insertEmbed(range.index, type, args, QuillScript.sources.USER);
      const oldNode = document.getElementById(e.dataTransfer.getData('id'));
      const oldOffset = QuillScript.find(oldNode).offset(quill.scroll);
      quill.editor.deleteText(oldOffset, 1, QuillScript.sources.USER);
      quill.update();
    });
  }
}
export default ArgieModule;

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

function idForClassName(className) {
  return `${className}_${nextHighestId(className)}`;
}

function nextHighestId(className) {
  const blots = Array.from(document.getElementsByClassName(className));
  if (blots.length === 0) {
    return 1;
  }
  return _.max(_.map(blots, blot => (idNum(className, blot.id)))) + 1;
}

function idNum(className, id) {
  const numInId = new RegExp(`${className}_(\\d+)`);
  const idNum = id.match(numInId);
  if (idNum && idNum.length && idNum.length > 1) {
    return parseInt(idNum[1]) || 0;
  }
  return 0;
}

class GlobalEmbed extends InlineEmbed {
  static create(globalName) {
    let node = super.create();
    ReactDOM.render(
      <GlobalEmbedComponent globalName={globalName} />,
      node
    );
    const newId = idForClassName('argie-global');
    node.setAttribute('id', newId);
    node.classList.add('argie-tag');
    node.classList.add('argie-global');
    node.setAttribute('contenteditable', 'false');
    node.setAttribute('draggable', 'true');
    node.dataset.globalName = globalName;
    let thisBlot = this;
    node.addEventListener('dragstart', e => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('id', e.target.id);
        e.dataTransfer.setData('type', 'global');
        e.dataTransfer.setData('globalName', globalName);
    });
    return node;
  }

  static value(node) {
    return node.dataset.globalName;
  }
}
GlobalEmbed.blotName = 'global';
GlobalEmbed.tagName = 'span';
QuillScript.register(GlobalEmbed);

export function insertFirstName(quill) {
  if (quill) {
    let range = quill.getSelection(true);
    quill.insertEmbed(
      range.index,
      'global',
      'firstName',
      QuillScript.sources.USER
    );
    quill.setSelection(range.index + 2, 0);
  }
}

export function insertLastName(quill) {
  if (quill) {
    let range = quill.getSelection(true);
    quill.insertEmbed(
      range.index,
      'global',
      'lastName',
      QuillScript.sources.USER
    );
    quill.setSelection(range.index + 2, 0);
  }
}
