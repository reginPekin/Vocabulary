import React from "react";

import { PairOfWords } from "../PairOfWords";

// import style from "./VocabularyTable.module.css";

export const VocabularyTable = ({ folder }) => {
  return folder.words.map((wordPair, key) => (
    <PairOfWords wordPair={wordPair} key={key} />
  ));
};
