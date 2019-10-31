import { createStore, combineReducers } from "redux";

const InitialState = {
  searchText: "",
  beam: 0
};

const InitialStateVocabulary = {
  folders: [],
  id: 0
};

const addNewFolder = (state = InitialStateVocabulary, action) => {
  switch (action.type) {
    case "GET_FOLDERS_NAMES":
      return {
        ...state,
        folders: action.folders
      };
    case "ADD_WORDS_ARRAY":
      return {
        ...state,
        folders: state.folders.map(folder => {
          if (folder.id === action.id) {
            console.log("yyyy");
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
        folders: [action.newFolder, ...state.folders]
      };
    case "DELETE_FOLDER":
      return {
        ...state,
        folders: state.folders.filter(folder => folder.id !== action.id)
      };
    case "ADD_NEW_WORD":
      return {
        ...state,
        folders: state.folders.map(folder => {
          if (folder.id === action.id) {
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
        folders: state.folders.map(folder => {
          if (folder.id === action.id)
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
        folders: state.folders.map(folder => {
          if (folder.id === action.id) return { ...folder, name: action.name };
          else return folder;
        })
      };

    case "EDIT_WORD_NAME":
      return {
        ...state,
        folders: state.folders.map(folder => {
          if (folder.id === action.id) {
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
    case "SET_HOOK_BEAM":
      return { ...state, beam: state.beam + 1 };
    default:
      return state;
  }
};

export const store = createStore(
  combineReducers({ addNewFolder, smallActions }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
