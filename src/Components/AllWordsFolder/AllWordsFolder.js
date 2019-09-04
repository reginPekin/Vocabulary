import React from "react";
import { Link } from "react-router-dom";

import style from "./AllWordsFolder.module.css";

export const AllWordsFolder = () => {
  return (
    <Link to="/">
      <button className={style.allWordsButton}>All words</button>
    </Link>
  );
};
