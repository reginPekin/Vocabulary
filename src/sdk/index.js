import axios from "axios";

export const getFolderNames = async () => {
  return await axios
    .get("http://localhost:4000/vocabulary/folders/names")
    .then(response => response.data);
};

export const editWord = async (folderId, wordId, newName) => {
  return await axios.patch(
    "http://localhost:4000/vocabulary/folders/" +
      folderId +
      "/words/edit/" +
      wordId,
    newName
  );
};

export const deleteFolder = async folder => {
  return await axios.delete(
    "http://localhost:4000/vocabulary/folders/" + folder.folderId
  );
};

export const renameFolder = async (folder, text) => {
  return await axios.patch(
    "http://localhost:4000/vocabulary/folders/" + folder.folderId,
    { folderName: text }
  );
};

export const createNewWord = async (folder, newWord) => {
  return await axios.post(
    "http://localhost:4000/vocabulary/folders/" + folder.folderId + "/words",
    newWord
  );
};

export const createFolder = async newFolder => {
  return await axios.post(
    "http://localhost:4000/vocabulary/folders",
    newFolder
  );
};

export const deleteWordsPair = async (folderId, wordPair, wordInf) => {
  return await axios.post(
    "http://localhost:4000/vocabulary/folders/" +
      folderId +
      "/words/" +
      wordPair.wordId,
    wordInf
  );
};

export const getWordsArray = async folder => {
  return await axios
    .get("http://localhost:4000/vocabulary/folders/" + folder.folderId)
    .then(response => response.data);
};
