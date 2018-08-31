import { runQuery } from '../graphql';

import { createGenericError } from './generic-error';

export const SET_HELLO_STRING = 'SET_HELLO_STRING';

export function setHelloString(helloString) {
  return { type: SET_HELLO_STRING, helloString };
};

export function fetchHelloString() {
  return wrap(async dispatch => {
    const data = await runQuery(`
      {
        hello
      }
    `);

    dispatch(setHelloString(data.hello));
  });
};

export function wrapErrorHandler(fn) {
  return function(dispatch) {
    fn(dispatch).catch(error => dispatch(createGenericError(error)));
  };
};

