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
            id: action.id,
            folderName: action.folderName,
            isOpen: true,
            words: []
          }
        ]
      };
    case "CLOSE_ALL":
      return {
        ...state,
        array: state.array.map(folder => {
          return { ...folder, isOpen: false };
        })
      };
    default:
      return state;
  }
};

// const closeAndOpenFolder = (state = InitialStateVocabulary, action) => {
//   switch (action.type) {
//     case "CLOSE_ALL":
//       return {
//         ...state,
//         array: state.array.map(folder => {
//           return { ...folder, isOpen: false };
//         })
//       };
//     default:
//       return state;
//   }
// };

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
