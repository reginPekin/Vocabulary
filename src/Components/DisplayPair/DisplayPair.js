import React from "react";

import style from "./DisplayPair.module.css";

export const DisplayPair = ({ wordPair }) => {
  return (
    <div className={style.displayPair}>
      <span>{wordPair.foreignWord}: </span>
      <span>{wordPair.nativeWord}</span>
    </div>
  );
};
