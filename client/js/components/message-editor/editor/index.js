import * as React from 'react';

import DragAndDropEditor from './drag-and-drop.js';
import AdvancedEditor from './advanced.js';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
  }

  setText(text) {
    this.editorRef.current.setText(text);
  }

  getText() {
    return this.editorRef.current.getText();
  }

  render() {
    const { useAdvanced, defaultValue } = this.props;
    let EditorComponent = useAdvanced ? AdvancedEditor : DragAndDropEditor;

    return (
      <EditorComponent
        ref={ this.editorRef }
        defaultValue={ defaultValue }
      />
    )
  }
}

export default Editor;



