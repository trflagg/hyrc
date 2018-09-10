import React from 'react';

import { Link } from 'react-router-dom';

import Header from './header';

const Home = () => {
  return (
    <div>
      <Header />
      <Link to="/messages">Edit Messages</Link>
    </div>
  )
}

export default Home;
