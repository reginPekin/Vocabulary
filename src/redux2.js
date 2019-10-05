import { createStore, combineReducers } from "redux";

const InitialState = {
  searchText: ""
};

const InitialStateVocabulary = {
  vocabulary: []
};

const addNewFolder = (state = InitialStateVocabulary, action) => {
  switch (action.type) {
    case "ADD_NEW_VOCABULARY":
      return {
        ...state,
        vocabulary: action.vocabulary
      };
    case "ADD_WORDS_ARRAY":
      return {
        ...state,
        vocabulary: state.vocabulary.map(folder => {
          if (folder.folderId === action.folderId) {
            return {
              ...folder,
              words: action.words
            };
          }
          return folder;
        })
      };
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
  combineReducers({ addNewFolder, smallActions }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
