import _ from 'lodash';
import { produce } from 'immer';

import { parseGraphQLError } from './generic-error';

import {
  SELECT_MESSAGE,
  SET_MESSAGE_LIST,
  START_SAVING_MESSAGE,
  SAVE_MESSAGE_SUCCESSFUL,
  ERROR_SAVING_MESSAGE,
  NEW_MESSAGE,
} from '../actions/messages';

const initialState = {
  messageList: [],
  selectedMessageId: null,
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
      if (action.message) {
        draft.selectedMessageId = action.message.id;
      } else {
        draft.selectedMessageId = null;
      }
      return;

    case NEW_MESSAGE:
      draft.messageList[action.message.id] = {
        id: action.message.id,
        name: 'NEW_MESSAGE',
        text: '',
      }
      return;

    case START_SAVING_MESSAGE:
      // update data in messageList
      draft.messageList[action.message.id] = action.message;
      draft.messageList[action.message.id].beingSaved = true;
      return;

    case SAVE_MESSAGE_SUCCESSFUL:
      const saveMessage = Object.assign({}, action.message);
      saveMessage.beingSaved = false;
      saveMessage.error = null;
      saveMessage.fieldErrors = null;
      draft.messageList[action.message.id] = saveMessage;
      return;

    case ERROR_SAVING_MESSAGE:
      // message that we were trying to save
      let message = Object.assign({}, _.get(action, 'payload.message'));

      // error from the payload
      const error = _.get(action, 'payload.error');
      const { errorMessage, fieldErrors } = parseGraphQLError(error);

      draft.messageSaveError = errorMessage;

      message.fieldErrors = fieldErrors;
      message.error = errorMessage;
      draft.messageList[message.id] = message;
      return;
  }
}, initialState);

export default messages;
