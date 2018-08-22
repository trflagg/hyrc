import { produce } from 'immer';

import { SET_MESSAGE_LIST } from '../actions/messages';

const initialState = {
  messageList: [],
};

const messages = produce((draft, action) =>  {
  switch(action.type) {
    case SET_MESSAGE_LIST:
      draft.messageList = action.messageList;
      return;
  }
}, initialState);

export default messages;
