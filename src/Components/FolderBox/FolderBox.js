import React from "react";
import { Link } from "react-router-dom";

import style from "./FolderBox.module.css";

export const FolderBox = ({ folder }) => {
  return (
    <Link to={`/${folder.folderId}/${folder.folderName}`}>
      <button className={style.boxFolder}>{folder.folderName}</button>
    </Link>
  );
};
