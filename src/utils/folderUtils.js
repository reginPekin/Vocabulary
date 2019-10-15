export const getFoldersNames = vocabulary => {
  return {
    type: "ADD_NEW_VOCABULARY",
    vocabulary
  };
};

export const deleteFolder = folderId => {
  return {
    type: "DELETE_FOLDER",
    folderId
  };
};

export const renameFolder = (folderId, folderName) => ({
  type: "RENAME_FOLDER",
  folderId,
  folderName
});

export const createFolder = newFolder => {
  return {
    type: "ADD_NEW_FOLDER",
    newFolder
  };
};
