import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { VocabularyTable } from "../VocabularyTable";
import { NewWordsPair } from "../NewWordsPair";

import { getWordsArray } from "../../utils/wordUtils";

import * as sdk from "../../sdk";

export const Vocabulary = ({ folder, wordCounter }) => {
  const dispatch = useDispatch();

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
        </tbody>
      </table>
      <NewWordsPair dispatch={dispatch} folderId={folder.folderId} />
    </div>
  );
};
