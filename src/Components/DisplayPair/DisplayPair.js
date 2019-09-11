import React from "react";

import style from "./DisplayPair.module.css";

export const DisplayPair = ({ wordPair }) => {
  return (
    <tr className={style.displayPair}>
      <td>{wordPair.foreignWord}</td>
      <td>{wordPair.nativeWord}</td>
    </tr>
  );
};
