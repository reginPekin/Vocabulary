import React from "react";

import { DisplayPair } from "../DisplayPair";

export const VocabularyTable = ({ folder }) => {
  // const url = `/${folder.folderName}`;
  return (
    <div>
      {folder.words.map((wordPair, key) => (
        <DisplayPair wordPair={wordPair} key={key} />
      ))}
    </div>
  );
};