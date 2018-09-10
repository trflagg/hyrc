import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from './home';
import MessageEditor from './message-editor';

const App = () => {
  return (
    <Switch>
      <Route path="/messages" component={MessageEditor} />
      <Route path="/" component={Home} />
    </Switch>
  );
}

export default App;
