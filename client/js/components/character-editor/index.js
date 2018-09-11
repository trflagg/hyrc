import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import './character-editor.scss';

import Header from '../header';

class CharacterEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: _.get(props.character, 'name', ''),
      gender: _.get(props.character, 'gender', 'FEMALE'),
    };
  }

  handleNameChange = e => {
    console.log(e.target.value);
    this.setState({
      name: e.target.value,
    });
  }

  handleGenderChange = e => {
    console.log(e.target.value);
    this.setState({
      gender: e.target.value,
    });
  }

  handleSaveClick = e => {
    e.preventDefault();
    console.log('save');
  }

  render() {
    const { name, gender } = this.state;

    return (
      <div id="character-editor" className='pageContainer'>
        <Header />

        <h1>Edit Character</h1>
        <form className='content'>
          <div>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              id="character-name"
              onChange={this.handleNameChange}
              value={name}
            />
          </div>

          <div>
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              id="character-gender"
              onChange={this.handleGenderChange}
              value={gender}>
              <option value="FEMALE">Female</option>
              <option value="MALE">Male</option>
            </select>
          </div>

          <div>
            <button onClick={this.handleSaveClick}>
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    character: state.character.character,
  }
}

const CharacterEditorConnected = connect(mapStateToProps)(CharacterEditor);
export default CharacterEditorConnected;
