import axios from "axios";

export const getFolderNames = async () => {
  return await axios
    .get("http://localhost:4000/vocabulary/folders/names")
    .then(response => response.data);
};

export const editWord = async newName => {
  return await axios.patch(
    "http://localhost:4000/vocabulary/folders/" +
      newName.id +
      "/words/edit/" +
      newName.wordId,
    newName
  );
};

export const deleteFolder = async id => {
  return await axios.delete("http://localhost:4000/vocabulary/folders/" + id);
};

export const renameFolder = async (id, text) => {
  return await axios.patch("http://localhost:4000/vocabulary/folders/" + id, {
    name: text
  });
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

export const deleteWordsPair = async wordInf => {
  return await axios.post(
    "http://localhost:4000/vocabulary/folders/" +
      wordInf.id +
      "/words/" +
      wordInf.wordId,
    wordInf
  );
};

export const getWordsArray = async folderId => {
  return await axios
    .get("http://localhost:4000/vocabulary/folders/" + folderId + "/words")
    .then(response => response.data);
};

export const getFolder = async folderId => {
  return await axios
    .get("http://localhost:4000/vocabulary/folders/" + folderId)
    .then(response => response.data);
};
