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
