import React from 'react';

const Quill = require('quill/dist/quill.min.js');
require('quill/dist/quill.core.css');
require('quill/dist/quill.bubble.css');
require('quill/dist/quill.snow.css');

//import argieMod, { insertCommandBlot } from './argieMod';
import argieMod, { insertCommandBlot } from './argie-quill-module';

require('./editor.scss');

class Editor extends React.Component {
  componentDidMount() {
    const toolbar = [
        [{ header: ['1', '2', '3', false] }],
        ['bold', 'italic', 'underline'],
        ['clean'],
    ];
    this.quill = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar,
        argieMod,
      },
    });

    if (this.props.defaultValue) {
      this.setText(this.props.defaultValue);
    }
  }

  setText = text => {
    this.quill.setText(text.trimStart().trimEnd());
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
