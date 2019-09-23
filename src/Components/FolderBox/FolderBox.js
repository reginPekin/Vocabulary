import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import style from "./FolderBox.module.css";

export const FolderBox = ({ folder, reset, onDispatch }) => {
  return (
    <div>
      <Link to={`/${folder.folderName}/${folder.folderId}`}>
        <button className={style.boxFolder}>{folder.folderName}</button>
      </Link>
      <button
        onClick={() => {
          axios
            .get("http://localhost:4000/vocabulary/delete/" + folder._id)
            .then(() => reset())
            .catch(err => console.log(err));
          onDispatch();
        }}
      >
        Delete me :c
      </button>
    </div>
  );
};
