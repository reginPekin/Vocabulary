import React from "react";

import { VocabularyTable } from "../VocabularyTable";
import { AddWord } from "../AddWord";

export const Vocabulary = ({ folder, folderId }) => {
  return (
    <div>
      <VocabularyTable folder={folder} key={folderId} />
      {folderId >= 0 && <AddWord folderId={folderId} />}
    </div>
  );
};
