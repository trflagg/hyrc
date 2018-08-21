import 'babel-polyfill';

const ReactDOM = require('react-dom');

const App = require('./components/app');

ReactDOM.render(
  App(),
  document.getElementById('root')
);

