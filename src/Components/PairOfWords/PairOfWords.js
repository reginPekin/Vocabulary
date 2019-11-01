import React, { useState } from "react";

import { Button } from "../Button";
import { EditingInput } from "../EditingInput";

import Delete from "../../images/deleteImage.png";

import styles from "./DisplayPair.module.css";

import * as sdk from "../../sdk";

export const PairOfWords = ({ folderId, wordPair, onDelete, onEdit }) => {
  const [isVisibleForeign, setIsVisibleForeign] = useState(true);
  const [isVisibleNative, setIsVisibleNative] = useState(true);

  return (
    <tr className={styles.PairOfWords}>
      <td>
        {isVisibleForeign && (
          <Button
            value={wordPair.foreignWord}
            onClick={() => setIsVisibleForeign(!isVisibleForeign)}
          />
        )}

        {!isVisibleForeign && (
          <EditingInput
            initialState={wordPair.foreignWord}
            changeVisibility={() => setIsVisibleForeign(!isVisibleForeign)}
            onSubmit={value => {
              const newName = {
                word: "foreign",
                wordId: wordPair.wordId,
                id: folderId,
                renamedWord: value
              };
              sdk
                .editWord(newName)
                .then(() => onEdit(newName.wordId, "foreign", value));
            }}
          />
        )}
      </td>

      <td>
        {isVisibleNative && (
          <Button
            value={wordPair.nativeWord}
            onClick={() => setIsVisibleNative(!isVisibleNative)}
          />
        )}
        {!isVisibleNative && (
          <EditingInput
            initialState={wordPair.foreignWord}
            changeVisibility={() => setIsVisibleNative(!isVisibleNative)}
            onSubmit={value => {
              const newName = {
                word: "native",
                wordId: wordPair.wordId,
                id: folderId,
                renamedWord: value
              };
              sdk
                .editWord(newName)
                .then(() => onEdit(newName.wordId, "native", value));
            }}
          />
        )}
      </td>
      <td className={styles.deleteTd}>
        <Button
          onClick={() => {
            let wordInf = {
              id: folderId,
              wordId: wordPair.wordId
            };
            sdk.deleteWordsPair(wordInf).then(() => onDelete(wordPair.wordId));
          }}
          value={<img alt="Delete" src={Delete} />}
        />
      </td>
    </tr>
  );
};
