import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import { fetchAllMessages } from '../actions/messages';
import { loadCharacter } from '../actions/character';

import Home from './home';
import MessageEditor from './message-editor';
import CharacterEditor from './character-editor';
import PlayGame from './play';


class App extends React.Component {
  componentDidMount() {
    this.props.fetchAllMessages();
    this.props.loadCharacter();
  }

  render() {
    return (
      <Switch>
        <Route path="/play" component={PlayGame} />
        <Route path="/messages" component={MessageEditor} />
        <Route path="/character" component={CharacterEditor} />
        <Route path="/" component={Home} />
      </Switch>
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
