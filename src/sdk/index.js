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
    "http://localhost:4000/vocabulary/folders/" + folder.id
  );
};

export const renameFolder = async (folder, text) => {
  return await axios.patch(
    "http://localhost:4000/vocabulary/folders/" + folder.id,
    { name: text }
  );
};

export const createNewWord = async (folderId, newWord) => {
  return await axios.post(
    "http://localhost:4000/vocabulary/folders/" + folderId + "/words",
    newWord
  );
};

export const createFolder = async newFolder => {
  return await axios.post(
    "http://localhost:4000/vocabulary/folders",
    newFolder
  );
};

export const deleteWordsPair = async (folderId, wordInf) => {
  return await axios.post(
    "http://localhost:4000/vocabulary/folders/" +
      folderId +
      "/words/" +
      wordInf.wordId,
    wordInf
  );
};

export const getWordsArray = async folderId => {
  return await axios
    .get("http://localhost:4000/vocabulary/folders/" + folderId)
    .then(response => response.data);
};
