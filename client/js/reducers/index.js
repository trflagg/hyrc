import { combineReducers } from 'redux';

import helloString from './helloString';
import errors from './generic-error';
import messages from './messages';
import character from './character';

const root = combineReducers({
  helloString,
  errors,
  messages,
  character,
});

module.exports = root;
