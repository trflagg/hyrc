import _ from 'lodash';
import { produce } from 'immer';

import {
  SELECT_MESSAGE,
  SET_MESSAGE_LIST,
  START_SAVING_MESSAGE,
  SAVE_MESSAGE_SUCCESSFUL,
  ERROR_SAVING_MESSAGE,
} from '../actions/messages';

const initialState = {
  messageList: [],
  selectedMessage: null,
};

const messages = produce((draft, action) =>  {
  switch(action.type) {
    case SET_MESSAGE_LIST:
      // turn array into object with id as property
      let messageList = {};
      action.messageList.forEach(message => {
        messageList[message.id] = message;
        messageList[message.id].beingSaved = false;
        messageList[message.id].error = null;
      });
      draft.messageList = messageList;
      return;

    case SELECT_MESSAGE:
      draft.selectedMessage = action.message;
      return;

    case START_SAVING_MESSAGE:
      // update data in messageList
      draft.messageList[action.message.id] = action.message;
      draft.messageList[action.message.id].beingSaved = true;
      if (draft.selectedMessage.id === action.message.id) {
        draft.selectedMessage = action.message;
      }
      return;

    case SAVE_MESSAGE_SUCCESSFUL:
      draft.messageList[action.message.id].beingSaved = false;
      draft.messageList[action.message.id].error = null;
      if (draft.selectedMessage.id === action.message.id) {
        draft.selectedMessage = action.message;
      }
      return;

    case ERROR_SAVING_MESSAGE:
      let errorMessage = 'An error ocurred.';
      const message = _.get(action, 'payload.message');
      const error = _.get(action, 'payload.error');
      if (error) {
        const errors = _.get(error, 'response.errors');
        if (errors && errors.length) {
          errorMessage = _.reduce(errors, (msg, error) =>
            (msg + `${error.message} `)
            , '');
        } else if (error.message) {
          errorMessage = error.message;
        }
      }
      draft.messageSaveError = errorMessage;
      if (message.id) {
        draft.messageList[message.id].error = errorMessage;
      }
      if (draft.selectedMessage.id === message.id) {
        draft.selectedMessage = message;
        draft.selectedMessage.error = errorMessage;
      }
      return;
  }
}, initialState);

export default messages;
