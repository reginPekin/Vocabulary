import { createStore, combineReducers } from "redux";

const InitialState = {
  searchText: "",
  wordCounter: 0
};

const InitialStateVocabulary = {
  vocabulary: [],
  folderId: 0
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
    case "ADD_NEW_FOLDER":
      return {
        ...state,
        vocabulary: [action.newFolder, ...state.vocabulary]
      };
    case "DELETE_FOLDER":
      return {
        ...state,
        vocabulary: state.vocabulary.filter(
          folder => folder.folderId !== action.folderId
        )
      };
    case "ADD_NEW_WORD":
      return {
        ...state,
        vocabulary: state.vocabulary.map(folder => {
          if (folder.folderId === action.folderId) {
            return {
              ...folder,
              words: [
                ...folder.words,
                {
                  nativeWord: action.nativeWord,
                  foreignWord: action.foreignWord,
                  wordId: action.wordId
                }
              ]
            };
          }
          return folder;
        })
      };

    case "DELETE_WORDS":
      return {
        ...state,
        vocabulary: state.vocabulary.map(folder => {
          if (folder.folderId === action.folderId)
            return {
              ...folder,
              words: folder.words.filter(
                words => words.wordId !== action.wordId
              )
            };
          else return folder;
        })
      };
    case "RENAME_FOLDER":
      return {
        ...state,
        vocabulary: state.vocabulary.map(folder => {
          if (folder.folderId === action.folderId)
            return { ...folder, folderName: action.folderName };
          else return folder;
        })
      };

    case "EDIT_WORD_NAME":
      return {
        ...state,
        vocabulary: state.vocabulary.map(folder => {
          if (folder.folderId === action.folderId) {
            return {
              ...folder,
              words: folder.words.map(words => {
                if (words.wordId === action.wordId) {
                  if (action.wordLanguage === "native")
                    return { ...words, nativeWord: action.renamedWord };
                  if (action.wordLanguage === "foreign")
                    return { ...words, foreignWord: action.renamedWord };
                  else return words;
                } else return words;
              })
            };
          } else return folder;
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
    case "INCREASE_WORD_COUNTER":
      return {
        ...state,
        wordCounter: action.wordCounter + 1
      };
    default:
      return state;
  }
};

export const store = createStore(
  combineReducers({ addNewFolder, smallActions }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
