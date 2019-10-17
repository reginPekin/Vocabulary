import React from "react";

import { PairOfWords } from "../PairOfWords";

// import style from "./VocabularyTable.module.css";

export const VocabularyTable = ({ folder, dispatch }) => {
  return folder.words.map((wordPair, key) => (
    <PairOfWords
      folderId={folder.folderId}
      wordPair={wordPair}
      key={key}
      dispatch={dispatch}
    />
  ));
};
