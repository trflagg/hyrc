import React from 'react';

const Quill = require('quill/dist/quill.min.js');
require('quill/dist/quill.core.css');
require('quill/dist/quill.bubble.css');
require('quill/dist/quill.snow.css');

import ArgieTagControls from './argie-tag-controls';

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
      theme: 'bubble',
      modules: {
        toolbar,
        argieMod,
      },
    });

    if (this.props.defaultValue) {
      this.quill.setText(this.props.defaultValue.trimStart().trimEnd());
    }
  }

  handleAddCommandClick = () => {
    insertCommandBlot(this.quill);
  }

  render() {
    return (
      <div id='editor-container'>
        <ArgieTagControls
          quill={this.quill}
          onClick={this.handleAddCommandClick}
        />
        <div id='editor'/>
      </div>
    );
  }
}

export default Editor;
