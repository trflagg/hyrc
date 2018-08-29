import { runQuery } from '../graphql';
import { wrapErrorHandler } from './index';

export const SET_MESSAGE_LIST = 'SET_MESSAGE_LIST';
export const SELECT_MESSAGE = 'SELECT_MESSAGE';
export const START_SAVING_MESSAGE = 'START_SAVING_MESSAGE';
export const SAVE_MESSAGE_SUCCESSFUL = 'SAVE_MESSAGE_SUCCESSFUL';
export const ERROR_SAVING_MESSAGE = 'ERROR_SAVING_MESSAGE';

export function setMessageList(messageList) {
  return { type: SET_MESSAGE_LIST, messageList };
};

export function selectMessage(message) {
  return { type: SELECT_MESSAGE, message };
}

export function startSavingMessage(message) {
  return { type: START_SAVING_MESSAGE, message };
}

export function saveMessageSuccessful(result) {
  return { type: SAVE_MESSAGE_SUCCESSFUL, result };
}

export function errorSavingMessage(error) {
  return { type: ERROR_SAVING_MESSAGE, error };
}

export function fetchAllMessages() {
  return wrapErrorHandler(async dispatch => {
    const data = await runQuery(`
      {
        messageList {
          name
          text
        }
      }
    `);
    dispatch(setMessageList(data.messageList));
  });
}

export function saveMessage(message) {
  return async dispatch => {
    dispatch(startSavingMessage(message));
    const query = `
      mutation CreateOrUpdateMessage($message: MessageInput!) {
        createOrUpdateMessage(message: $message) {
          name
        }
      }
    `;
    const variables = { message };
    runQuery(query, variables).then(result => {
      // need to refer to mutation name to get the message data
      dispatch(saveMessageSuccessful(result.createOrUpdateMessage));
    }).catch(error => {
      dispatch(errorSavingMessage(error));
    });
  }
}
