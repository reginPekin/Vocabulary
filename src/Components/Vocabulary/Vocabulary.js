import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { VocabularyTable } from "../VocabularyTable";
import { NewWordsPair } from "../NewWordsPair";

import { addWordsArray } from "../../utils/wordUtils";

import * as sdk from "../../sdk";

export const Vocabulary = ({ folder }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("VAAAAAN");
    sdk.getWordsArray(folder.id).then(response => {
      console.log(response);
      dispatch(addWordsArray(folder.id, response));
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folder]);

  return (
    <div>
      <table>
        <tbody>
          <VocabularyTable folder={folder} dispatch={dispatch} />
        </tbody>
      </table>
      <NewWordsPair dispatch={dispatch} folderId={folder.id} />
    </div>
  );
};
