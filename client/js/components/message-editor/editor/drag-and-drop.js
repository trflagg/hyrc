import * as React from 'react';
import Delta from 'quill-delta';

const Quill = require('quill/dist/quill.min.js');
require('quill/dist/quill.core.css');
require('quill/dist/quill.bubble.css');
require('quill/dist/quill.snow.css');

import argieMod, {
  deltaToText,
  textToDelta,
  insertFirstName,
  insertLastName,
} from '../../../lib/argie-quill-mod/index';
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
    return deltaToText(ops);
  }

  getContents = () => {
    return this.quill.getContents();
  }

  setText = text => {
    if (text) {
      this.quill.setContents(textToDelta(text.trimStart().trimEnd()));
    }
  }

  handleFirstNameClick = () => {
    insertFirstName(this.quill);
  }

  handleLastNameClick = () => {
    insertLastName(this.quill);
  }

  render() {
    return (
      <div id='editor-container'>
        <Toolbar
          onFirstNameClick={this.handleFirstNameClick}
          onLastNameClick={this.handleLastNameClick}
        />
        <div id='editor'/>
      </div>
    );
  }
}

export default DragAndDropEditor;
