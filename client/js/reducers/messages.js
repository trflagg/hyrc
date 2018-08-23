import { produce } from 'immer';

import { SELECT_MESSAGE, SET_MESSAGE_LIST } from '../actions/messages';

const initialState = {
  messageList: [],
  selectedMessage: null,
};

const messages = produce((draft, action) =>  {
  switch(action.type) {
    case SET_MESSAGE_LIST:
      draft.messageList = action.messageList;
      return;
    case SELECT_MESSAGE:
      draft.selectedMessage = action.message;
  }
}, initialState);

export default messages;
