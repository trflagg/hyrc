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
        messageList[message.id].fieldErrors = null;
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
      const saveMessage = Object.assign({}, action.message);
      saveMessage.beingSaved = false;
      saveMessage.error = null;
      saveMessage.fieldErrors = null;
      draft.messageList[action.message.id] = saveMessage;
      if (draft.selectedMessage.id === saveMessage.id) {
        draft.selectedMessage = saveMessage;
      }
      return;

    case ERROR_SAVING_MESSAGE:
      let errorMessage = 'An error ocurred.';

      // message that we were trying to save
      let message = Object.assign({}, _.get(action, 'payload.message'));

      // error from the payload
      const error = _.get(action, 'payload.error');
      if (error) {
        // may either be array in response.errors or message string
        const errors = _.get(error, 'response.errors');
        // errors is an array, but we only look at the first entry
        // TODO: loop through errors and concatenate all field errors & messages
        if (errors && errors.length) {
          errorMessage = errors[0].message;
          message.fieldErrors = errors[0].state;
        } else if (error.message) {
          errorMessage = error.message;
        }
      }

      draft.messageSaveError = errorMessage;
      message.error = errorMessage;
      draft.messageList[message.id] = message;
      if (draft.selectedMessage.id === message.id) {
        draft.selectedMessage = message;
      }
      return;
  }
}, initialState);

export default messages;
