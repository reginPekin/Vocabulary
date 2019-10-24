export const addNewWord = newWord => {
  return {
    type: "ADD_NEW_WORD",
    id: newWord.folderId,
    wordId: newWord.wordId,
    foreignWord: newWord.foreignWord,
    nativeWord: newWord.nativeWord
  };
};

export const deleteWordsPair = (id, wordId) => {
  return {
    type: "DELETE_WORDS",
    id,
    wordId
  };
};

export const editWord = (wordLanguage, wordId, id, renamedWord) => {
  return {
    type: "EDIT_WORD_NAME",
    wordLanguage,
    wordId,
    id,
    renamedWord
  };
};

export const getWordsArray = (id, words) => {
  return {
    type: "ADD_WORDS_ARRAY",
    id,
    words
  };
};
