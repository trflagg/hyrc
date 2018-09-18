import { produce } from 'immer';

import { SET_USE_ADVANCED_EDITOR } from '../actions/settings';

const initialState = {
  useAdvancedEditor: false,
};

const settings = produce((draft, action) => {
  switch(action.type) {
    case SET_USE_ADVANCED_EDITOR:
      draft.useAdvancedEditor = action.useAdvancedEditor;
      return;
  }
}, initialState);

export default settings;

