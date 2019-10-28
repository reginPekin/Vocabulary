import React, { useState } from "react";

import { NewWordName } from "../NewWordName";

import { deleteWordsPair, editWord } from "../../utils/wordUtils";

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
            onSubmit={newWord =>
              dispatch(
                editWord(
                  newWord.wordLanguage,
                  newWord.wordId,
                  newWord.folderId,
                  newWord.renamedWord
                )
              )
            }
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
            sdk
              .deleteWordsPair(folderId, wordInf)
              .then(dispatch(deleteWordsPair(folderId, wordPair.wordId)));
          }}
        >
          Don't delete me, please :c
        </button>
      </td>
    </tr>
  );
};
