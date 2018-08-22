import { runQuery } from '../graphql';
import { wrap } from './index';

export const SET_MESSAGE_LIST = 'SET_MESSAGE_LIST';

export function setMessageList(messageList) {
  return { type: SET_MESSAGE_LIST, messageList };
};

export function fetchAllMessages() {
  return wrap(async dispatch => {
    const data = await runQuery(`
      {
        messageList {
        title
        }
      }
    `);
    dispatch(setMessageList(data.messageList));
  });
}
