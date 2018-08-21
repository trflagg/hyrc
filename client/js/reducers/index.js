import { combineReducers } from 'redux';

import helloString from './helloString';

const root = combineReducers({
  helloString
});

module.exports = root;
