import { produce } from 'immer';

import {
  LOAD_CHARACTER,
  PARSE_MESSAGE_RESULT,
} from '../actions/character';

const initialState = {
  character: null,
};

const character = produce((draft, action) => {
  switch(action.type) {
    case LOAD_CHARACTER:
      draft.character = action.character;
      return;
    case PARSE_MESSAGE_RESULT:
      draft.character.lastResult = action.character.lastResult;
      return;
  }
}, initialState);

 export default character;
