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
