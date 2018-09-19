import * as _ from  'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
const QuillScript = require('quill/dist/quill.min.js');
const InlineEmbed = QuillScript.import('blots/embed');

import {
  rangeFromEvent,
  idForClassName,
  nextHighestId,
  idNum,
} from './utils';

import GetGlobalBlotComponent from './components/get-global-blot';

class GetGlobalBlot extends InlineEmbed {
  static create(args) {
    let node = super.create();
    const globalName = args.globalName || '';
    const editable = args.editable || false;
    ReactDOM.render(
      <GetGlobalBlotComponent
        globalName={globalName}
        editable={editable}
      />,
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
        e.dataTransfer.setData('type', 'getGlobal');
        e.dataTransfer.setData('globalName', globalName);
    });
    return node;
  }

  static value(node) {
    return node.dataset.globalName;
  }

  static templateString(insertOperation) {
    return `<%= avatar.getGlobal('${insertOperation.getGlobal}') %>`;
  }

  static regEx = /getGlobal\(\'(\w+)\'\)/;

  static modifyDeltaWithRegExResults(delta, results) {
    if (_.get(results, 'length', 0) > 1) {
      const globalName = results[1];
      let editable = true;
      // shamefully, editable must be hardcoded based on globalName
      // in the future, maybe make it a second argument to avatar.getGlobal?
      if (globalName === 'lastName' || globalName === 'firstName') {
        editable = false;
      }
      delta.insert({getGlobal: {
        globalName,
        editable
      }});
    }
    return delta;
  }
}
GetGlobalBlot.blotName = 'getGlobal';
GetGlobalBlot.tagName = 'span';

export default GetGlobalBlot;

export function insertCustomGlobal(quill) {
  if (quill) {
    let range = quill.getSelection(true);
    quill.insertEmbed(
      range.index,
      'getGlobal',
      {
        globalName: 'custom',
        editable: true,
      },
      QuillScript.sources.USER
    );
    quill.setSelection(range.index + 2, 0);
  }
}

export function insertFirstName(quill) {
  if (quill) {
    let range = quill.getSelection(true);
    quill.insertEmbed(
      range.index,
      'getGlobal',
      {
        globalName: 'firstName',
        editable: false,
      },
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
      'getGlobal',
      {
        globalName: 'lastName',
        editable: false,
      },
      QuillScript.sources.USER
    );
    quill.setSelection(range.index + 2, 0);
  }
}
