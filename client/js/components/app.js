import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import { fetchAllMessages } from '../actions/messages';
import { loadCharacter } from '../actions/character';

import Header from './header';
import GenericError from './generic-error';
import Home from './home';
import MessageEditor from './message-editor';
import CharacterEditor from './character-editor';
import PlayGame from './play-game';

require('../../sass/main.scss');

class App extends React.Component {
  componentDidMount() {
    this.props.fetchAllMessages();
    this.props.loadCharacter();
  }

  render() {
    return (
      <div className="pageContainer">
        <Header />
        <GenericError />
        <Switch>
          <Route path="/play" component={PlayGame} />
          <Route path="/messages" component={MessageEditor} />
          <Route path="/character" component={CharacterEditor} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllMessages: () => { dispatch(fetchAllMessages()) },
    loadCharacter: () => { dispatch(loadCharacter()) },
  }
}

const AppConnected = withRouter(connect(null, mapDispatchToProps)(App));

export default AppConnected;
