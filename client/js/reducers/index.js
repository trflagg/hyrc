import { combineReducers } from 'redux';

import helloString from './helloString';
import errors from './generic-error';
import messages from './messages';

const root = combineReducers({
  helloString,
  errors,
  messages,
});

module.exports = root;
