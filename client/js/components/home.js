import React from 'react';

import { Link } from 'react-router-dom';

import './home.scss';

import Header from './header';

const Home = () => {
  return (
    <div>
      <Header />
      <div id="home">

        <table className='link-table'>
          <thead>
            <tr><td> Jump to page: </td></tr>
          </thead>

          <tbody>
            <tr><td> <Link to="/play">Play Game</Link> </td></tr>
            <tr><td> <Link to="/messages">Edit Messages</Link> </td></tr>
            <tr><td> <Link to="/character">Edit Character</Link> </td></tr>
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default Home;
