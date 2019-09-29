import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import style from "./FolderBox.module.css";

export const FolderBox = ({ folder, reset }) => {
  // console.log(folder);
  return (
    <div>
      <Link to={`/${folder.folderId}/${folder.folderName}`}>
        <button className={style.boxFolder}>{folder.folderName}</button>
      </Link>
      <button
        onClick={() => {
          axios
            .get("http://localhost:4000/vocabulary/delete/" + folder._id)
            .then(() => reset())
            .catch(err => console.log(err));
        }}
      >
        Delete me :c
      </button>
    </div>
  );
};
