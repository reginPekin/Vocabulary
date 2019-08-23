import React from "react";
import { Route } from "react-router-dom";

import { DisplayPair } from "../displayPair";

export const VocabularyTable = ({ folder }) => {
  return (
    <div>
      {folder.words.map((wordPair, key) => (
        <Route path="/">
          <DisplayPair wordPair={wordPair} key={key} />
        </Route>
      ))}
    </div>
  );
};
