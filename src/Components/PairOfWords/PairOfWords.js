import React, { useState } from "react";
import axios from "axios";

import { NewWordName } from "../NewWordName";

import { deleteWordsPair } from "../../utils/wordUtils";

import style from "./DisplayPair.module.css";

export const PairOfWords = ({ folderId, wordPair, dispatch }) => {
  const [isVisibleForeign, setIsVisibleForeign] = useState(true);
  const [isVisibleNative, setIsVisibleNative] = useState(true);
  return (
    <tr className={style.PairOfWords}>
      <td>
        {isVisibleForeign && (
          <div>
            {wordPair.foreignWord}
            <button onClick={() => setIsVisibleForeign(!isVisibleForeign)}>
              Edit me
            </button>
          </div>
        )}
        {!isVisibleForeign && (
          <NewWordName
            folderId={folderId}
            wordId={wordPair.wordId}
            word="foreign"
            changeVisibility={() => setIsVisibleForeign(!isVisibleForeign)}
            dispatch={dispatch}
          />
        )}
      </td>
      <td>
        {isVisibleNative && (
          <div>
            {wordPair.nativeWord}
            <button onClick={() => setIsVisibleNative(!isVisibleNative)}>
              Edit me
            </button>
          </div>
        )}
        {!isVisibleNative && (
          <NewWordName
            folderId={folderId}
            wordId={wordPair.wordId}
            word="native"
            changeVisibility={() => setIsVisibleNative(!isVisibleNative)}
          />
        )}
      </td>
      <td>
        <button
          onClick={() => {
            let wordInf = {
              folderId: folderId,
              wordId: wordPair.wordId
            };
            axios
              .post(
                "http://localhost:4000/vocabulary/folders/" +
                  folderId +
                  "/words/" +
                  wordPair.wordId,
                wordInf
              )
              .then(dispatch(deleteWordsPair(folderId, wordPair.wordId)));

            console.log(wordPair.wordId);
          }}
        >
          Don't delete me, please :c
        </button>
      </td>
    </tr>
  );
};
