import React from "react";
import { Link } from "react-router-dom";

export const FolderBox = ({ folder }) => {
  return (
    <div>
      <Link to={`/${folder.folderName}`}>{folder.folderName}</Link>
    </div>
  );
};
