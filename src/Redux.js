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
            console.log(action.word);
            if (
              folder.words.filter(word => word.wordId === action.wordId)
                .length > 0
            ) {
              return {
                ...folder,
                words: folder.words.map(word => {
                  if (word.wordId === action.wordId) {
                    if (action.word === "foreign") {
                      return {
                        ...word,
                        foreignWord: action.foreignWord
                      };
                    } else {
                      return {
                        ...word,
                        nativeWord: action.nativeWord
                      };
                    }
                  }
                  return word;
                })
              };
            } else {
              console.log("else");
              if (action.word === "foreign") {
                return {
                  ...folder,
                  words: [
                    ...folder.words,
                    {
                      foreignWord: action.foreignWord,
                      wordId: action.wordId
                    }
                  ]
                };
              } else {
                return {
                  ...folder,
                  words: [
                    ...folder.words,
                    {
                      nativeWord: action.nativeWord,
                      wordId: action.wordId
                    }
                  ]
                };
              }
            }
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
