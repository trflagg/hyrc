import { runQuery } from '../graphql';
import { wrapErrorHandler } from './index';

import { clearGenericError } from './generic-error';

export const SET_MESSAGE_LIST = 'SET_MESSAGE_LIST';
export const SELECT_MESSAGE = 'SELECT_MESSAGE';
export const START_SAVING_MESSAGE = 'START_SAVING_MESSAGE';
export const SAVE_MESSAGE_SUCCESSFUL = 'SAVE_MESSAGE_SUCCESSFUL';
export const ERROR_SAVING_MESSAGE = 'ERROR_SAVING_MESSAGE';

export function setMessageList(messageList) {
  return { type: SET_MESSAGE_LIST, messageList };
};

export function selectMessage(message) {
  return dispatch => {
    dispatch(clearGenericError());
    dispatch({ type: SELECT_MESSAGE, message });
  }
}

export function startSavingMessage(message) {
  return { type: START_SAVING_MESSAGE, message };
}

export function saveMessageSuccessful(message) {
  return { type: SAVE_MESSAGE_SUCCESSFUL, message };
}

export function errorSavingMessage(error, message) {
  return { type: ERROR_SAVING_MESSAGE, payload: {error, message} };
}

export function fetchAllMessages() {
  return wrapErrorHandler(async dispatch => {
    const data = await runQuery(`
      {
        messageList {
          name
          text
          id
        }
      }
    `);
    dispatch(setMessageList(data.messageList));
  });
}
export function deleteMessage(message) {
  return wrapErrorHandler(async dispatch => {
    const query = `
      mutation DeleteMessage($message: MessageInput!) {
        deleteMessage(message: $message) {
          id
        }

      }
    `;
    const variables = {
      message: {
        id: message.id,
        name: message.name,
        text: message.text,
      }
    };
    const result = await runQuery(query, variables);
    dispatch(fetchAllMessages());
    dispatch(selectMessage(null));
  });
}

export function saveMessage(message) {
  return async dispatch => {
    dispatch(startSavingMessage(message));
    const query = `
      mutation CreateOrUpdateMessage($message: MessageInput!) {
        createOrUpdateMessage(message: $message) {
          name
          text
          id
        }
      }
    `;
    const variables = {
      message: {
        name: message.name,
        text: message.text,
        id: message.id,
      }
    };
    runQuery(query, variables).then(result => {
      // need to refer to mutation name to get the message data
      dispatch(saveMessageSuccessful(result.createOrUpdateMessage));
    }).catch(error => {
      dispatch(errorSavingMessage(error, message));
    });
  }
}
