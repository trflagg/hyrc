import React from 'react';

const Quill = require('quill/dist/quill.min.js');
require('quill/dist/quill.core.css');
require('quill/dist/quill.snow.css');

class Editor extends React.Component {
  componentDidMount() {
    const toolbar = [
        [{ header: ['1', '2', '3', false] }],
        ['bold', 'italic', 'underline'],
        ['clean'],
    ];
    const quill = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar,
      },
    });
  }

  render() {
    return (
      <div id='editor'/>
    );
  }
}

export default Editor;
