import { Vocabulary } from "./vocabulary";

import { createStore, combineReducers } from "redux";

const InitialState = {
  searchText: ""
};

const InitialStateVocabulary = {
  array: Vocabulary
};

const addNewFolder = (state = InitialStateVocabulary, action) => {
  switch (action.type) {
    case "ADD_NEW_FOLDER":
      return {
        ...state,
        array: [
          ...state.array,
          {
            folderId: action.id,
            folderName: action.folderName,
            words: []
          }
        ]
      };

    case "ADD_NEW_WORD":
      return {
        ...state,
        array: state.array.map(folder => {
          if (folder.folderId === action.folderId) {
            console.log(typeof folder.folderId, typeof action.folderId);
            return {
              ...folder,
              words: [
                ...folder.words,
                { foreignWord: action.words, wordId: action.wordId }
              ]
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
