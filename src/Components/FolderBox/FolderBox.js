import React from "react";
import { Link } from "react-router-dom";

export const FolderBox = ({ folder }) => {
  return (
    <Link to={`/${folder.folderId}/${folder.folderName}`}>
      <button>{folder.folderName}</button>
    </Link>
  );
};
