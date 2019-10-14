export const addNewWord = (
  folderId,
  wordId,
  word,
  foreignWord = undefined,
  nativeWord = undefined
) => {
  return {
    type: "ADD_NEW_WORD",
    folderId,
    word,
    wordId,
    foreignWord,
    nativeWord
  };
};

export const deleteWordsPair = (folderId, wordId) => {
  return {
    type: "DELETE_WORDS",
    folderId,
    wordId
  };
};
