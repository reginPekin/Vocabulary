import React from "react";
import { Link } from "react-router-dom";

import style from "../FolderBox/FolderBox.module.css";

export const AllWordsFolder = ({ currentFolderId }) => {
  return (
    <Link to="/">
      <button
        className={style.boxFolder}
        style={{
          backgroundColor: currentFolderId === "" ? "#D4D4D4" : "white"
        }}
      >
        Start
      </button>
    </Link>
  );
};
