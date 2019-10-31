import React, { useState } from "react";

import { NewWordName } from "../NewWordName";

import style from "./DisplayPair.module.css";

import * as sdk from "../../sdk";

export const PairOfWords = ({ folderId, wordPair, onDelete, onEdit }) => {
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
            word={wordPair.foreignWord}
            onEdit={onEdit}
          />
        )}
      </td>

      <td>
        {isVisibleNative && (
          <div>
            {wordPair.nativeWord}
            <button onClick={() => setIsVisibleNative(!isVisibleNative)}>
              Edit
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
            onEdit={onEdit}
          />
        )}
      </td>
      <td>
        <button
          onClick={() => {
            let wordInf = {
              id: folderId,
              wordId: wordPair.wordId
            };
            sdk.deleteWordsPair(wordInf).then(() => onDelete(wordPair.wordId));
          }}
        >
          Don't delete me, please :c
        </button>
      </td>
    </tr>
  );
};
