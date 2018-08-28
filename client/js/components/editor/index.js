import React from 'react';

const Quill = require('quill/dist/quill.min.js');
require('quill/dist/quill.core.css');
require('quill/dist/quill.bubble.css');
require('quill/dist/quill.snow.css');

import ArgieTagControls from './argie-tag-controls';

//import argieMod, { insertCommandBlot } from './argieMod';
import argieMod, { insertCommandBlot } from './argie-quill-module';

class Editor extends React.Component {
  componentDidMount() {
    const toolbar = [];
    //const toolbar = [
        //[{ header: ['1', '2', '3', false] }],
        //['bold', 'italic', 'underline'],
        //['clean'],
    //];
    Quill.register('modules/argieMod', argieMod);
    this.quill = new Quill('#editor', {
      theme: 'bubble',
      modules: {
        toolbar,
        argieMod,
      },
    });
  }

  handleAddCommandClick = () => {
    insertCommandBlot(this.quill);
  }

  render() {
    return (
      <div>
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
