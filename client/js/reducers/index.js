import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';

import helloString from './helloString';
import errors from './generic-error';
import messages from './messages';
import character from './character';

const root = combineReducers({
  helloString,
  errors,
  messages,
  character,
  form: formReducer,
});

module.exports = root;
