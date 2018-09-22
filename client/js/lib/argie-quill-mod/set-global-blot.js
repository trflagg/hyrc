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

import SetGlobalBlotComponent from './components/set-global-blot';

class SetGlobalBlot extends InlineEmbed {
  static create(args) {
    let node = super.create();
    const globalName = args.globalName || '';
    const value = args.value || '';

    ReactDOM.render(
      <SetGlobalBlotComponent
        defaultGlobalName={globalName}
        defaultValue={value}
        node={node}
      />,
      node
    );
    return node;
  }

  static value(node) {
    return {
      globalName: node.dataset.globalName,
      value: node.dataset.value,
    }
  }

  static templateString(blotInsertObject) {
    return `<% avatar.setGlobal('${blotInsertObject.globalName}', '${blotInsertObject.value}') %>`;
  }

  // matches avatar.setGlobal('[globalName]', '[value]')
  static regEx = /setGlobal\(\'(.*)\'\,\s*\'(.*)\'\)/;

  static modifyDeltaWithRegExResults(delta, results) {
    if (_.get(results, 'length', 0) > 1) {
      const globalName = results[1];
      const value = results[2];
      delta.insert({setGlobal: {
        globalName,
        value,
      }});
    }
    return delta;
  }
}
SetGlobalBlot.blotName = 'setGlobal';
SetGlobalBlot.tagName = 'span';

export default SetGlobalBlot;

export function insertSetGlobal(quill) {
  if (quill) {
    let range = quill.getSelection(true);
    quill.insertEmbed(
      range.index,
      'setGlobal',
      {
        globalName: 'editme',
        value: 'true',
      },
      QuillScript.sources.USER
    );
    quill.setSelection(range.index + 2, 0);
  }
}

