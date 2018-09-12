import { runQuery } from '../graphql';

import { wrapErrorHandler } from './index';

export const LOAD_CHARACTER = 'LOAD_CHARACTER';
export const PARSE_MESSAGE_RESULT = 'PARSE_MESSAGE_RESULT';

function loadCharacterAction(character) {
  return { type: LOAD_CHARACTER, character };
}

function parseMessageResultAction(character) {
  return { type: PARSE_MESSAGE_RESULT, character };
}

export function loadCharacter() {
  return wrapErrorHandler(async dispatch => {
    const data = await runQuery(`
      {
        character {
          firstName
          lastName
          gender
          lastResult
          id
          commands {
            text
          }
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

export function restartGame(character) {
  return wrapErrorHandler(async dispatch => {
    const query = `
      mutation RestartGame($character: CharacterInput!) {
        restartGame(character: $character) {
          id
          lastResult
          commands {
            text
          }
        }
      }
    `;
    const variables = {
      character: {
        id: character.id,
      }
    };
    runQuery(query, variables).then(result => {
      // TODO: field-level error handling
      dispatch(parseMessageResultAction(result.restartGame));
    });
  });
}

export function runMessageText(character, messageText) {
  return wrapErrorHandler(async dispatch => {
    const query = `
      mutation RunMessage($character: CharacterInput!, $message: String) {
        runMessage(character: $character, message: $message) {
          id
          lastResult
          commands {
            text
          }
        }
      }
    `;
    const variables = {
      character: {
        id: character.id,
      },
      message: messageText,
    };
    runQuery(query, variables).then(result => {
      dispatch(parseMessageResultAction(result.runMessage));
    });
  });
}

