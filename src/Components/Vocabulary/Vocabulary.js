import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { VocabularyTable } from "../VocabularyTable";
import { NewWordsPair } from "../NewWordsPair";

import { getWordsArray } from "../../utils/wordUtils";

import * as sdk from "../../sdk";

export const Vocabulary = ({ folder, wordCounter }) => {
  const dispatch = useDispatch();

  const [newWordTable, setNewWordTable] = useState(false);
  useEffect(() => {
    sdk
      .getWordsArray(folder)
      .then(response => dispatch(getWordsArray(folder.folderId, response)));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, wordCounter]);

  return (
    <div>
      <table>
        <tbody>
          <VocabularyTable folder={folder} dispatch={dispatch} />
          {newWordTable && (
            <NewWordsPair folderId={folder.folderId} dispatch={dispatch} />
          )}
        </tbody>
      </table>
      {!newWordTable && (
        <button onClick={() => setNewWordTable(!newWordTable)}>
          Add new words
        </button>
      )}{" "}
    </div>
  );
};
