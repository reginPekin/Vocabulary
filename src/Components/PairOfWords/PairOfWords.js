import React, { useState } from "react";

import { Button } from "../Button";
import { InputButton } from "../InputButton";

import Delete from "../../images/delete.svg";

import styles from "./PairOfWords.module.css";
import { setBackgroundColor, shortSpeechOfPart } from "../../utils";

export const PairOfWords = ({
  wordPair,
  onDelete,
  onEditWord,
  onEditSpeechPart
}) => {
  const [isVisibleForeign, setIsVisibleForeign] = useState(true);
  const [isVisibleNative, setIsVisibleNative] = useState(true);
  const [isVisibleSpeechPart, setIsVisibleSpeechPart] = useState(true);

  return (
    <tr className={styles.PairOfWords}>
      <td className={styles.rightColumn}>
        <InputButton
          visibility={isVisibleForeign}
          changeVisibility={visibility => setIsVisibleForeign(visibility)}
          onChange={value => onEditWord(value, "foreign")}
          text={wordPair.foreignWord}
          formClassName={styles.formClassName}
          inputClassName={styles.inputClassName}
          buttonClassName={styles.button}
        />
      </td>

      <td className={styles.leftColumn}>
        <InputButton
          visibility={isVisibleNative}
          changeVisibility={visibility => setIsVisibleNative(visibility)}
          onChange={value => onEditWord(value, "native")}
          text={wordPair.nativeWord}
          inputClassName={styles.inputClassName}
          buttonClassName={styles.button}
        />
      </td>
      <td className={styles.speechPart}>
        <InputButton
          visibility={isVisibleSpeechPart}
          changeVisibility={visibility => setIsVisibleSpeechPart(visibility)}
          buttonClassName={styles.speechPartElement}
          style={setBackgroundColor(shortSpeechOfPart(wordPair.speechPart))}
          text={shortSpeechOfPart(wordPair.speechPart)}
          onChange={value => onEditSpeechPart(value)}
          inputClassName={styles.speechPartInput}
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
