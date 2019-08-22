import React from "react";

import { DisplayPair } from "../displayPair";

export const VocabularyTable = ({ vocabulary }) => {
  return (
    <div>
      {vocabulary.map(
        folder =>
          folder.isOpen &&
          folder.words.map((wordPair, key) => (
            <DisplayPair wordPair={wordPair} key={key} />
          ))
      )}
    </div>
  );
};
