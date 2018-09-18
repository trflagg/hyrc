import * as React from 'react';
import Delta from 'quill-delta';

const Quill = require('quill/dist/quill.min.js');
require('quill/dist/quill.core.css');
require('quill/dist/quill.bubble.css');
require('quill/dist/quill.snow.css');

import argieMod, { insertFirstName } from '../../../lib/argie-quill-mod/index.tsx';
require('./editor.scss');
import Toolbar from './toolbar';

class DragAndDropEditor extends React.Component {
  componentDidMount() {
    Quill.register('modules/argieMod', argieMod);
    this.quill = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: '#toolbar',
        argieMod,
      },
    });

    if (this.props.defaultValue) {
      this.setText(this.props.defaultValue);
    }
  }

  getText = () => {
    const contents = this.getContents();
    // convert delta into text string
    const ops = _.get(contents, 'ops', []);
    return this.deltaToText(ops);
  }

  deltaToText = ops => {
    let text = '';
    _.forEach(ops, operation => {
      if(operation.insert) {
        switch(typeof operation.insert) {
          case 'string':
            text = text + operation.insert;
            break;
          case 'object':
            // only object right now is global blot
            // TODO: check property to figure out what kind of blot and what
            // template string to append
            text = text + `<%= avatar.getGlobal('${operation.insert.global}') %>`;
            break;
        }
      }
    });
    return text;
  }

  getContents = () => {
    return this.quill.getContents();
  }

  setText = text => {
    if (text) {
      this.quill.setContents(this.textToDelta(text.trimStart().trimEnd()));
    }
  }

  textToDelta(passedInText) {
    let text = passedInText;
    let delta = new Delta;
    // convert text into deltas by parsing template strings into blots
    while(text !== '') {
      // get start of next template
      const nextStartIndex = text.indexOf('<%');
      if (nextStartIndex === -1) {
        // no template string, push the rest of the text
        delta.insert(text);
        text = '';
      } else {
        // push up to template string start
        delta.insert(text.substring(0, nextStartIndex));
        text = text.substring(nextStartIndex)
        // get end of template string
        // add 2 to include '%>'
        const nextEndIndex = text.indexOf('%>') + 2;
        if (nextEndIndex === -1) {
          throw new Error(`Unterminated template string: ${text}`);
        }
        // convert template string to delta
        const templateString = text.substring(0, nextEndIndex);
        delta = this.modifyDeltaWithTemplateString(delta, templateString);
        // remove template string
        text = text.substring(nextEndIndex);
      }
    }
    return delta;
  }

  modifyDeltaWithTemplateString(delta, templateString) {
    // insert blot based on template string
    const getGlobalRegEx = /getGlobal\(\'(\w+)\'\)/;
    const getGlobalResults = getGlobalRegEx.exec(templateString);
    if (_.get(getGlobalResults, 'length', 0) > 1) {
      const globalName = getGlobalResults[1];
      delta.insert({global: globalName});
    } else {
      // template string not handled, insert as text
      delta.insert(templateString);
    }
    return delta;
  }

  handleFirstNameClick = () => {
    insertFirstName(this.quill);
  }

  render() {
    return (
      <div id='editor-container'>
        <Toolbar onFirstNameClick={this.handleFirstNameClick} />
        <div id='editor'/>
      </div>
    );
  }
}

export default DragAndDropEditor;
