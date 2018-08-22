import { combineReducers } from 'redux';

import helloString from './helloString';
import messages from './messages';

const root = combineReducers({
  helloString,
  messages,
});

module.exports = root;
