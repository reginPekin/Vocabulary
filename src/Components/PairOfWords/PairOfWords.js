import React, { useState } from "react";

import { Button } from "../Button";
import { InputButton } from "../InputButton";

import Delete from "../../images/deleteImage.png";

import styles from "./PairOfWords.module.css";

export const PairOfWords = ({ wordPair, onDelete, onEdit }) => {
  const [isVisibleForeign, setIsVisibleForeign] = useState(true);
  const [isVisibleNative, setIsVisibleNative] = useState(true);

  return (
    <tr className={styles.PairOfWords}>
      <td className={styles.rightColumn}>
        <InputButton
          visibility={isVisibleForeign}
          changeVisibility={visibility => setIsVisibleForeign(visibility)}
          onChange={value => onEdit(value, "foreign")}
          text={wordPair.foreignWord}
          inputClassName={styles.inputClassName}
          buttonClassName={styles.button}
        />
      </td>

      <td className={styles.leftColumn}>
        <InputButton
          visibility={isVisibleNative}
          changeVisibility={visibility => setIsVisibleNative(visibility)}
          onChange={value => onEdit(value, "native")}
          text={wordPair.nativeWord}
          inputClassName={styles.inputClassName}
          buttonClassName={styles.button}
        />
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
