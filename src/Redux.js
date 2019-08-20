import { Vocabulary } from "./Vocabulary";

import { createStore, combineReducers } from "redux";

const InitialState = {
  searchText: ""
};

const InitialStateVocabulary = {
  array: Vocabulary
};

const showPage = (state = InitialStateVocabulary, action) => {
  switch (action.type) {
    case "ADD_NEW_FOLDER":
      return [
        ...state,
        { id: action.id, folderName: action.folderName, isOpen: true }
      ];
    default:
      return state;
  }
};

const smallActions = (state = InitialState, action) => {
  switch (action.type) {
    case "CHANGE_SEARCH_TEXT":
      return { ...state, searchText: action.searchText };
    default:
      return state;
  }
};

export const store = createStore(
  combineReducers({ showPage, smallActions }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
