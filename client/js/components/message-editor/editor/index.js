import React from 'react';

const Quill = require('quill/dist/quill.min.js');
require('quill/dist/quill.core.css');
require('quill/dist/quill.bubble.css');
require('quill/dist/quill.snow.css');

import argieMod from '../../../lib/argie-quill-mod/index.ts';
require('./editor.scss');

class Editor extends React.Component {
  componentDidMount() {
    Quill.register('modules/argieMod', argieMod);
    this.quill = new Quill('#editor', {
      theme: 'snow',
      modules: {
        argieMod,
      },
    });

    if (this.props.defaultValue) {
      this.setText(this.props.defaultValue);
    }
  }

  getText = () => {
    return this.quill.getText();
  }

  setText = text => {
    if (text) {
      this.quill.setText(text.trimStart().trimEnd());
    }
  }

  handleAddCommandClick = () => {
    insertCommandBlot(this.quill);
  }

  render() {
    return (
      <div id='editor-container'>
        <div id='editor'/>
      </div>
    );
  }
}

export default Editor;
