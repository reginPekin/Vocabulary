import React from "react";
import { Link } from "react-router-dom";

import style from "../FolderBox/FolderBox.module.css";

export const AllWordsFolder = () => {
  return (
    <Link to="/">
      <button className={style.boxFolder}>Start</button>
    </Link>
  );
};
