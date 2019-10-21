import React, { useState } from "react";

import { NewWordName } from "../NewWordName";

import { deleteWordsPair } from "../../utils/wordUtils";

import style from "./DisplayPair.module.css";

import * as sdk from "../../sdk";

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
            wordLanguage="foreign"
            changeVisibility={() => setIsVisibleForeign(!isVisibleForeign)}
            dispatch={dispatch}
            word={wordPair.foreignWord}
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
            wordLanguage="native"
            changeVisibility={() => setIsVisibleNative(!isVisibleNative)}
            word={wordPair.nativeWord}
            dispatch={dispatch}
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
            sdk
              .deleteWordsPair(folderId, wordPair, wordInf)
              .then(dispatch(deleteWordsPair(folderId, wordPair.wordId)));
          }}
        >
          Don't delete me, please :c
        </button>
      </td>
    </tr>
  );
};
