import * as React from 'react';

const Quill = require('quill/dist/quill.min.js');
require('quill/dist/quill.core.css');
require('quill/dist/quill.bubble.css');
require('quill/dist/quill.snow.css');

class Advanced extends React.Component {
  componentDidMount() {
    this.quill = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: false,
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
    this.quill.setText(text);
  }

  render() {
    return (
      <div id='editor-container'>
        <div id='editor'/>
      </div>
    );
  }
}

export default Advanced;
