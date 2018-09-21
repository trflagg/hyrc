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

import GetGlobalBlotComponent from './components/set-global-blot';

class GetGlobalBlot extends InlineEmbed {
  static create(globalName) {
    let node = super.create();
    ReactDOM.render(
      <GetGlobalBlotComponent globalName={globalName} />,
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
GetGlobalBlot.blotName = 'global';
GetGlobalBlot.tagName = 'span';

export default GetGlobalBlot;
