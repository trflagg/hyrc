import React from 'react';

const Quill = require('quill/dist/quill.min.js');
require('quill/dist/quill.core.css');
require('quill/dist/quill.bubble.css');
require('quill/dist/quill.snow.css');

import ArgieTagControls from './argie-tag-controls';

import argieMod from './argieMod';

class Editor extends React.Component {
  componentDidMount() {
    const toolbar = [
        [{ header: ['1', '2', '3', false] }],
        ['bold', 'italic', 'underline'],
        ['clean'],
    ];
    Quill.register('modules/argieMod', argieMod);
    this.quill = new Quill('#editor', {
      theme: 'bubble',
      modules: {
        toolbar,
        argieMod,
      },
    });
  }

  render() {
    return (
      <div>
        <ArgieTagControls quill={this.quill} />
        <div id='editor'/>
      </div>
    );
  }
}

export default Editor;
