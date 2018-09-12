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
          firstName
          lastName
          gender
          id
        }
      }
    `);
    dispatch(loadCharacterAction(data.character));
  });
}

export function saveCharacter(character) {
  return wrapErrorHandler(async dispatch => {
    const query = `
      mutation UpdateCharacter($character: CharacterInput!) {
        updateCharacter(character: $character) {
          firstName
          lastName
          gender
          id
        }
      }
    `;
    const variables = {
      character: {
        firstName: character.firstName,
        lastName: character.lastName,
        gender: character.gender,
        id: character.id,
      }
    };
    runQuery(query, variables).then(result => {
      // TODO: field-level error handling
      dispatch(loadCharacterAction(result.updateCharacter));
    });
  });
}
