import React from 'react';

import { Link } from 'react-router-dom';

import './home.scss';

import Header from './header';

const Home = () => {
  return (
    <div>
      <Header />
      <div id="home">

        <table class='link-table'>
          <thead>
            <tr><td> Jump to page: </td></tr>
          </thead>

          <tbody>
            <tr><td> <Link to="/messages">Edit Messages</Link> </td></tr>
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default Home;
