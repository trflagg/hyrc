import { runQuery } from '../graphql';
import { wrapErrorHandler } from './index';

import { clearGenericErrorAction } from './generic-error';

export const SET_MESSAGE_LIST = 'SET_MESSAGE_LIST';
export const SELECT_MESSAGE = 'SELECT_MESSAGE';
export const START_SAVING_MESSAGE = 'START_SAVING_MESSAGE';
export const SAVE_MESSAGE_SUCCESSFUL = 'SAVE_MESSAGE_SUCCESSFUL';
export const ERROR_SAVING_MESSAGE = 'ERROR_SAVING_MESSAGE';
export const NEW_MESSAGE = 'NEW_MESSAGE';

export function setMessageListAction(messageList) {
  return { type: SET_MESSAGE_LIST, messageList };
};

export function addNewMessageAction(message) {
  return { type: NEW_MESSAGE, message };
}

export function selectMessageAction(message) {
  return { type: SELECT_MESSAGE, message };
}

export function startSavingMessageAction(message) {
  return { type: START_SAVING_MESSAGE, message };
}

export function saveMessageSuccessfulAction(message) {
  return { type: SAVE_MESSAGE_SUCCESSFUL, message };
}

export function errorSavingMessageAction(error, message) {
  return { type: ERROR_SAVING_MESSAGE, payload: {error, message} };
}

export function selectMessage(message) {
  return dispatch => {
    dispatch(clearGenericErrorAction());
    dispatch(selectMessageAction(message));
  }
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
    dispatch(setMessageListAction(data.messageList));
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
    dispatch(selectMessageAction(null));
  });
}

export function validateMessage(message) {
  if (message.name === '') {
    return ({
      state: {
        name: 'Name cannot be blank',
      },
      message: 'An error occurred.',
    });
  }
  return null;
}

export function saveMessage(message) {
  return async dispatch => {
    const validationError = validateMessage(message);
    if (validationError) {
      dispatch(errorSavingMessageAction(validationError, message));
      dispatch(selectMessageAction(message));
      return;
    }

    dispatch(startSavingMessageAction(message));
    const query = `
      mutation UpdateMessage($message: MessageInput!) {
        updateMessage(message: $message) {
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
      dispatch(saveMessageSuccessfulAction(result.updateMessage));
    }).catch(error => {
      dispatch(errorSavingMessageAction(error, message));
    });
  }
}

export function createNewMessage() {
  return wrapErrorHandler(async dispatch => {
    const query = `
      mutation CreateMessage {
        createMessage {
          id
        }
      }
  `;
    runQuery(query).then(result => {
      const id = result.createMessage.id;
      dispatch(addNewMessageAction({ id }));
      dispatch(selectMessageAction({ id }));
    });
  });
}
