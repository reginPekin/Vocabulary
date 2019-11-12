import React, { useState } from "react";

import { Button } from "../Button";
import { EditingInput } from "../EditingInput";

import Delete from "../../images/deleteImage.png";

import styles from "./PairOfWords.module.css";

import * as sdk from "../../sdk";

export const PairOfWords = ({ folderId, wordPair, onDelete, onEdit }) => {
  const [isVisibleForeign, setIsVisibleForeign] = useState(true);
  const [isVisibleNative, setIsVisibleNative] = useState(true);

  return (
    <tr className={styles.PairOfWords}>
      <td className={styles.rightColumn}>
        {isVisibleForeign && (
          <Button
            buttonClassName={styles.button}
            onClick={() => setIsVisibleForeign(!isVisibleForeign)}
          >
            {wordPair.foreignWord}
          </Button>
        )}

        {!isVisibleForeign && (
          <EditingInput
            inputClassName={styles.inputClassName}
            value={wordPair.foreignWord}
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

      <td className={styles.leftColumn}>
        {isVisibleNative && (
          <Button
            buttonClassName={styles.button}
            onClick={() => setIsVisibleNative(!isVisibleNative)}
          >
            {wordPair.nativeWord}
          </Button>
        )}
        {!isVisibleNative && (
          <EditingInput
            inputClassName={styles.inputClassName}
            value={wordPair.nativeWord}
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
          buttonClassName={styles.deleteButton}
          onClick={() => {
            const wordInf = {
              id: folderId,
              wordId: wordPair.wordId
            };
            sdk.deleteWordsPair(wordInf).then(() => onDelete(wordPair.wordId));
          }}
        >
          <img alt="Delete" src={Delete} width={20} />
        </Button>
      </td>
    </tr>
  );
};
