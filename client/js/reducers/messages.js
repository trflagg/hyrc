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
  messageBeingSaved: null,
  messageSaveError: null,
};

const messages = produce((draft, action) =>  {
  switch(action.type) {
    case SET_MESSAGE_LIST:
      draft.messageList = action.messageList;
      return;

    case SELECT_MESSAGE:
      draft.selectedMessage = action.message;
      return;

    case START_SAVING_MESSAGE:
      draft.messageBeingSaved = action.message.name;
      // update message data in list
      // TODO: change list to use name as index to avoid this search
      const i = _.findIndex(draft.messageList, {name: action.message.name});
      draft.messageList[i] = action.message;
      return;

    case SAVE_MESSAGE_SUCCESSFUL:
      draft.messageBeingSaved = null;
      draft.messageSaveError = null;
      return;

    case ERROR_SAVING_MESSAGE:
      let errorMessage = 'An error ocurred.';
      const error = _.get(action, 'error');
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
      draft.messageBeingSaved = null;
      return;
  }
}, initialState);

export default messages;
