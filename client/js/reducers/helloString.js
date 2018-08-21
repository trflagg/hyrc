import { SET_HELLO_STRING } from '../actions';

const initialString = '';

const helloString = (state, action) => {
  if (action.type === SET_HELLO_STRING) {
    return action.helloString;
  }
  return initialString;
};

export default helloString;

