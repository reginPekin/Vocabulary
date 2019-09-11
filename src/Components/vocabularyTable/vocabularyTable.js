import React from "react";

import { DisplayPair } from "../DisplayPair";

// import style from "./VocabularyTable.module.css";

export const VocabularyTable = ({ folder }) => {
  return folder.words.map((wordPair, key) => (
    <DisplayPair wordPair={wordPair} key={key} />
  ));
};
