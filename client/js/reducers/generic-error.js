import { produce } from 'immer';

import { CLEAR_ERROR, ERROR } from '../actions/generic-error';

const initialState = {
  message: null,
}

const errors = produce((draft, action) => {
  switch(action.type) {
    case CLEAR_ERROR:
      draft.message = null;
      return;

    case ERROR:
      if (action.error === null) {
        draft.message = null;
        return
      }
      const { errorMessage } = parseGraphQLError(action.error);
      draft.message = errorMessage;
      return;
  }
}, initialState);

export function parseGraphQLError(error) {
  let errorMessage = 'An error ocurred.';
  let fieldErrors = {};

  if (error) {
    // may either be array in response.errors or message string
    const errors = _.get(error, 'response.errors');
    // errors is an array, but we only look at the first entry
    // TODO: loop through errors and concatenate all field errors & messages
    if (errors && errors.length) {
      errorMessage = errors[0].message;
      fieldErrors = errors[0].state;
    } else if (error.message) {
      errorMessage = error.message;
    }
  }

  return { errorMessage, fieldErrors };
}

export default errors;
