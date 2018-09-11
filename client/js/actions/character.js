import { runQuery } from '../graphql';

import { wrapErrorHandler } from './index';

export const LOAD_CHARACTER = 'LOAD_CHARACTER';

function loadCharacterAction(character) {
  return { type: LOAD_CHARACTER, character };
}

export function loadCharacter() {
  return wrapErrorHandler(async dispatch => {
    const data = await runQuery(`
      {
        character {
          name
          gender
          id
        }
      }
    `);
    dispatch(loadCharacterAction(data.character));
  });
}
