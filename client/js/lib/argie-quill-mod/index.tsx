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
      const range: RangeStatic = rangeFromEvent(e, quill);
      console.log(`dragover: ${JSON.stringify(range)}`);
      quill.setSelection((range.index + 1), 0);
    });

    quill.root.addEventListener('drop', e => {
      e.preventDefault();
      const range: RangeStatic = rangeFromEvent(e, quill);
      console.log(`drop: ${JSON.stringify(range)}`);
      const type = e.dataTransfer.getData('type');
      quill.insertEmbed(range.index, type, QuillScript.sources.USER);
      const oldNode = document.getElementById(e.dataTransfer.getData('id'));
      console.log(`old_id ${e.dataTransfer.id}`);
      const oldOffset = QuillScript.find(oldNode).offset(quill.scroll);
      quill.editor.deleteText(oldOffset, 1, QuillScript.sources.USER);
      quill.update();
    });
  }
}
export default ArgieModule;

function rangeFromEvent(e, quill) {
  let native;
  // avoids typescript complaining about caretRangeFromPoint not existing
  // on document
  const doc: any = document;

  if (doc.caretRangeFromPoint) {
    native = doc.caretRangeFromPoint(e.clientX, e.clientY);
  } else if (doc.caretPositionFromPoint) {
    const position = doc.caretPositionFromPoint(e.clientX, e.clientY);
    native = doc.createRange();
    native.setStart(position.offsetNode, position.offset);
    native.setEnd(position.offsetNode, position.offset);
  } else {
    return;
  }
  const normalized = quill.selection.normalizeNative(native);
  return quill.selection.normalizedToRange(normalized);
}

function idForClassName(className: string): string {
  return `${className}_${nextHighestId(className)}`;
}

function nextHighestId(className: string): number {
  const blots = Array.from(document.getElementsByClassName(className));
  if (blots.length === 0) {
    return 1;
  }
  return _.max(_.map(blots, blot => (idNum(className, blot.id)))) + 1;
}

function idNum(className: string, id: string): number {
  const numInId = new RegExp(`${className}_(\\d+)`);
  const idNum = id.match(numInId);
  if (idNum && idNum.length && idNum.length > 1) {
    return parseInt(idNum[1]) || 0;
  }
  return 0;
}

class GlobalEmbed extends InlineEmbed {
  static create() {
    let node = super.create();
    ReactDOM.render(
      <GlobalEmbedComponent />,
      node
    );
    const newId = idForClassName('argie-global');
    node.setAttribute('id', newId);
      console.log(`create id ${newId}`);
    node.classList.add('argie-tag');
    node.classList.add('argie-global');
    node.setAttribute('contenteditable', 'false');
    node.setAttribute('draggable', 'true');
    let thisBlot: GlobalEmbed = this;
    node.addEventListener('dragstart', e => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('id', e.target.id);
        e.dataTransfer.setData('type', 'global');
    });
    return node;
  }
}
GlobalEmbed.blotName = 'global';
GlobalEmbed.tagName = 'span';
QuillScript.register(GlobalEmbed);

export function insertFirstName(quill: Quill) {
  if (quill) {
    let range: RangeStatic = quill.getSelection(true);
    quill.insertEmbed(range.index + 1, 'global', QuillScript.sources.USER);
    quill.setSelection(range.index + 2, 0);
  }
}
