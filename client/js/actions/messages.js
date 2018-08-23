import { runQuery } from '../graphql';
import { wrap } from './index';

export const SET_MESSAGE_LIST = 'SET_MESSAGE_LIST';
export const SELECT_MESSAGE = 'SELECT_MESSAGE';

export function setMessageList(messageList) {
  return { type: SET_MESSAGE_LIST, messageList };
};

export function selectMessage(message) {
  return { type: SELECT_MESSAGE, message };
}

export function fetchAllMessages() {
  return wrap(async dispatch => {
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
