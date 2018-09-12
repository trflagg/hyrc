import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import './character-editor.scss';

import { saveCharacter } from '../../actions/character';

import Header from '../header';
import CharacterEditor from './character-editor-form';

class CharacterEditorContainer extends React.Component {
  handleSubmit = data => {
    this.props.saveCharacter(data);
  }

  render() {
    return (
      <div id="character-editor" className='pageContainer'>
        <Header />
        <h1>Edit Character</h1>
        <CharacterEditor
          initialValues={this.props.initialValues}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    initialValues: state.character.character,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveCharacter: character => dispatch(saveCharacter(character))
  }
}

const CharacterEditorConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterEditorContainer);
export default CharacterEditorConnected;
