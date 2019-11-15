import React, { useState } from "react";

import { Button } from "../Button";
import { EditingInput } from "../EditingInput";

import Delete from "../../images/deleteImage.png";

import styles from "./PairOfWords.module.css";

export const PairOfWords = ({ wordPair, onDelete, onEdit }) => {
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
            onSubmit={value => onEdit(value, "foreign")}
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
            onSubmit={value => onEdit(value, "native")}
          />
        )}
      </td>
      <td className={styles.deleteTd}>
        <Button
          buttonClassName={styles.deleteButton}
          onClick={() => onDelete()}
        >
          <img alt="Delete" src={Delete} width={20} />
        </Button>
      </td>
    </tr>
  );
};
