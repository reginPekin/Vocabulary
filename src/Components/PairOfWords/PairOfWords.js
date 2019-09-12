import React from "react";

import style from "./DisplayPair.module.css";

export const PairOfWords = ({ wordPair }) => {
  return (
    <tr className={style.PairOfWords}>
      <td>{wordPair.foreignWord}</td>
      <td>{wordPair.nativeWord}</td>
    </tr>
  );
};
