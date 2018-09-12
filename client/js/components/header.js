import React from 'react';

import { Link } from 'react-router-dom';

require('./header.scss');

const Header = () => (
  <header>
    <Link to="/">
      <h1>hyrc</h1>
    </Link>
    <div class='left-side'>
      <Link to="/play">play</Link>
      <Link to="/character">character</Link>
      <Link to="/messages">messages</Link>
    </div>
  </header>
);

export default Header;
