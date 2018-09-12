import React from 'react';
import { connect } from 'react-redux';

require('./play-game.scss');

import { restartGame, loadCharacter, runMessageText } from '../../actions/character';

class PlayGame extends React.Component {
  componentDidMount() {
    if (!this.props.character) {
      this.props.loadCharacter();
    }
  }

  handleRestartGameClick = () => {
    this.props.restartGame(this.props.character);
  }

  handleCommandClick = commandText => {
    this.props.runMessageText(this.props.character, commandText);
  }

  render() {
    const lastResult = _.get(this.props.character, 'lastResult', '');
    const commands = _.get(this.props.character, 'commands', []);

    return (
      <div id="play-game" className='content'>
        <div className='output'>
          {lastResult &&
            <p>{lastResult}</p>
          }
        </div>

        <div className='commands'>
          {commands.map((command, i) => (
            <button
              key={i}
              onClick={() => this.handleCommandClick(command.text)}
            >
              {command.text}
            </button>
          ))}
        </div>

        <button onClick={this.handleRestartGameClick}>
          Restart Game
        </button>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    character: state.character.character,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    restartGame: character => { dispatch(restartGame(character)) },
    loadCharacter: () => { dispatch(loadCharacter()) },
    runMessageText: (character, messageText) => {
      dispatch(runMessageText(character, messageText))
    },
  }
};

const PlayGameConnected = connect(mapStateToProps, mapDispatchToProps)(PlayGame);

export default PlayGameConnected;
