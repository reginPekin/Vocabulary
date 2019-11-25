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

export const editSpeechPart = async newSpeechPart => {
  return await axios.patch(
    "http://localhost:4000/vocabulary/folder/" +
      newSpeechPart.id +
      "/words/" +
      newSpeechPart.wordId +
      "/speechPart",
    newSpeechPart
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

export const createNewWord = async newWord => {
  return await axios.post(
    "http://localhost:4000/vocabulary/folders/" + newWord.folderId + "/words",
    newWord
  );
};

export const createFolder = async newFolder => {
  return await axios.post(
    "http://localhost:4000/vocabulary/folders",
    newFolder
  );
};

export const deleteWordsPair = async (id, wordId) => {
  return await axios.post(
    "http://localhost:4000/vocabulary/folders/" + id + "/words/" + wordId,
    { id, wordId }
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

export const changeLanguage = async (id, text, language) => {
  return await axios.patch(
    "http://localhost:4000/vocabulary/folders/" + id + "/language",
    {
      language,
      renamedLanguage: text
    }
  );
};

export const foreignWordSort = async () => {
  return await axios.get(
    "http://localhost:4000/vocabulary/folders/words/foreignWordSort"
  );
};

export const nativeWordSort = async () => {
  return await axios.get(
    "http://localhost:4000/vocabulary/folders/words/nativeWordSort"
  );
};

export const speechPartSort = async () => {
  return await axios.get(
    "http://localhost:4000/vocabulary/folders/words/speechPartSort"
  );
};

export const dateSort = async () => {
  return await axios.get(
    "http://localhost:4000/vocabulary/folders/words/dateSort"
  );
};

export const sortNext = async arr => {
  return await axios.post("http://localhost:4000/vocabulary/folders/sort", arr);
};
