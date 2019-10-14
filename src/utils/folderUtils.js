import { NewFolder } from "../components/NewFolder/NewFolder";

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
