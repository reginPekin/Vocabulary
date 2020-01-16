import axios from "axios";

const API_ENDPOINT = "http://localhost:4000/vocabulary";

export const getFolderNames = async () => {
  return await axios
    .get(`${API_ENDPOINT}/folders/names`)
    .then(response => response.data);
};

export const editWord = async newName => {
  return await axios.patch(
    `${API_ENDPOINT}/folders/` + newName.id + "/words/edit/" + newName.wordId,
    newName
  );
};

export const editSpeechPart = async newSpeechPart => {
  return await axios.patch(
    `${API_ENDPOINT}/folder/` +
      newSpeechPart.id +
      "/words/" +
      newSpeechPart.wordId +
      "/speechPart",
    newSpeechPart
  );
};

export const deleteFolder = async id => {
  return await axios.delete(`${API_ENDPOINT}/folders/` + id);
};

export const renameFolder = async (id, text) => {
  return await axios.patch(`${API_ENDPOINT}/folders/` + id, {
    name: text
  });
};

export const createNewWord = async newWord => {
  return await axios.post(
    `${API_ENDPOINT}/folders/` + newWord.folderId + "/words",
    newWord
  );
};

export const createFolder = async newFolder => {
  return await axios.post(`${API_ENDPOINT}/folders`, newFolder);
};

export const deleteWordsPair = async (id, wordId) => {
  return await axios.post(
    `${API_ENDPOINT}/folders/` + id + "/words/" + wordId,
    { id, wordId }
  );
};

export const getWordsArray = async (folderId, sort, sortDirecton) => {
  return await axios
    .get(
      `${API_ENDPOINT}/folders/` +
        folderId +
        "/words?sort=" +
        sort +
        "&direction=" +
        sortDirecton
    )
    .then(response => response.data);
};

export const getFolder = async folderId => {
  return await axios
    .get(`${API_ENDPOINT}/folders/` + folderId)
    .then(response => response.data);
};

export const changeLanguage = async (id, text, language) => {
  return await axios.patch(`${API_ENDPOINT}/folders/` + id + "/language", {
    language,
    renamedLanguage: text
  });
};
