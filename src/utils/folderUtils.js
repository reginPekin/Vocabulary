export const getFoldersNames = folders => {
  return {
    type: "GET_FOLDERS_NAMES",
    folders
  };
};

export const deleteFolder = id => {
  return {
    type: "DELETE_FOLDER",
    id
  };
};

export const renameFolder = (id, name) => ({
  type: "RENAME_FOLDER",
  id,
  name
});

export const createFolder = newFolder => {
  return {
    type: "ADD_NEW_FOLDER",
    newFolder
  };
};
