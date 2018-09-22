import * as _ from  'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Delta from 'quill-delta';
const QuillScript = require('quill/dist/quill.min.js');
const InlineEmbed = QuillScript.import('blots/embed');

import { Quill, RangeStatic } from 'quill';

import GetGlobalBlot from './get-global-blot';
import SetGlobalBlot from './set-global-blot';

import { rangeFromEvent } from './utils';

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
      let args = {};

      if (type === 'getGlobal') {
        args.globalName = e.dataTransfer.getData('globalName');
        // dataTransfer data can come across as string representation of boolean
        args.editable = (e.dataTransfer.getData('editable').toString() === 'true');
      } else if (type === 'setGlobal') {
        args.globalName = e.dataTransfer.getData('globalName');
        args.value = e.dataTransfer.getData('value');
      }

      quill.insertEmbed(range.index, type, args, QuillScript.sources.USER);
      const oldNode = document.getElementById(e.dataTransfer.getData('id'));
      const oldOffset = QuillScript.find(oldNode).offset(quill.scroll);
      quill.editor.deleteText(oldOffset, 1, QuillScript.sources.USER);
      quill.update();
    });
  }
}

QuillScript.register(GetGlobalBlot);
QuillScript.register(SetGlobalBlot);

export function deltaToText(ops) {
  let text = '';
  _.forEach(ops, operation => {
    const insert = operation.insert;
    if(insert) {
      switch(typeof insert) {
        case 'string':
          text = text + insert;
          break;
        case 'object':
          if (insert.hasOwnProperty('getGlobal')) {
            text = text + GetGlobalBlot.templateString(insert.getGlobal);
          } else if (insert.hasOwnProperty('setGlobal')) {
            text = text + SetGlobalBlot.templateString(insert.setGlobal);
          }
          break;
      }
    }
  });
  return text;
}

export function textToDelta(text) {
  let currentText = text;
  let delta = new Delta;
  // convert text into deltas by parsing template strings into blots
  while(currentText !== '') {
    // get start of next template string
    const nextStartIndex = currentText.indexOf('<%');
    if (nextStartIndex === -1) {
      // no template string, push the rest of the text
      delta.insert(currentText);
      currentText = '';
    } else {
      // push up to template string start
      delta.insert(currentText.substring(0, nextStartIndex));
      currentText = currentText.substring(nextStartIndex)
      // get end of template string
      // add 2 to include '%>'
      const nextEndIndex = currentText.indexOf('%>') + 2;
      if (nextEndIndex === -1) {
        throw new Error(`Unterminated template string: ${currentText}`);
      }
      // convert template string to delta
      const templateString = currentText.substring(0, nextEndIndex);
      delta = modifyDeltaWithTemplateString(delta, templateString);
      // remove template string
      currentText = currentText.substring(nextEndIndex);
    }
  }
  return delta;
}

function modifyDeltaWithTemplateString(delta, templateString) {
  const blots = [ GetGlobalBlot, SetGlobalBlot ];

  // check string against each blot's regEx
  let found = false;
  for (const blot of blots) {
    const results = blot.regEx.exec(templateString);
    // if there is a match, call blot's method
    if(results) {
      delta = blot.modifyDeltaWithRegExResults(delta, results);
      found = true;
    }
  }

  if (!found) {
    // template string not handled, insert as text
    delta.insert(templateString);
  }
  return delta;
}

export { insertFirstName, insertLastName, insertCustomGlobal } from './get-global-blot';
export { insertSetGlobal } from './set-global-blot';

export default ArgieModule;

