export const addNewWord = newWord => {
  return {
    type: "ADD_NEW_WORD",
    folderId: newWord.folderId,
    wordId: newWord.wordId,
    foreignWord: newWord.foreignWord,
    nativeWord: newWord.nativeWord
  };
};

export const deleteWordsPair = (folderId, wordId) => {
  return {
    type: "DELETE_WORDS",
    folderId,
    wordId
  };
};

export const editWord = (wordLanguage, wordId, folderId, renamedWord) => {
  return {
    type: "EDIT_WORD_NAME",
    wordLanguage,
    wordId,
    folderId,
    renamedWord
  };
};

export const getWordsArray = (folderId, words) => {
  return {
    type: "ADD_WORDS_ARRAY",
    folderId,
    words
  };
};
