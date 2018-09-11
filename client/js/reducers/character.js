import { produce } from 'immer';

import {
  LOAD_CHARACTER
} from '../actions/character';

const initialState = {
  character: null,
};

const character = produce((draft, action) => {
  switch(action.type) {
    case LOAD_CHARACTER:
      draft.character = action.character;
      return;
  }
}, initialState);

 export default character;
