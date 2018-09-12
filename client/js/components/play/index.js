import React from 'react';
import { connect } from 'react-redux';

import { restartGame, loadCharacter } from '../../actions/character';

class PlayGame extends React.Component {
  componentDidMount() {
    if (!this.props.character) {
      this.props.loadCharacter();
    }
  }

  handleRestartGameClick = () => {
    this.props.restartGame(this.props.character);
  }

  render() {
    const lastResult = _.get(this.props.character, 'lastResult', '');

    return (
      <div className='contents output'>
        {lastResult &&
          <p>{lastResult}</p>
        }

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
  }
};

const PlayGameConnected = connect(mapStateToProps, mapDispatchToProps)(PlayGame);

export default PlayGameConnected;
