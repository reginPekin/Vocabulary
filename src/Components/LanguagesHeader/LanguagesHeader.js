import React, { useState } from "react";

import { InputButton } from "../InputButton/index.js";

import styles from "./LanguagesHeader.module.css";

export const LanguagesHeader = ({
  onForeignChange,
  onNativeChange,
  foreignLanguage,
  nativeLanguage
}) => {
  const [foreignVisibility, setForeignVisibility] = useState(true);
  const [nativeVisibility, setNativeVisibility] = useState(true);
  return (
    <tr>
      <th>
        <InputButton
          inputClassName={styles.elements}
          buttonClassName={styles.elements}
          text={foreignLanguage}
          visibility={foreignVisibility}
          changeVisibility={visibility => setForeignVisibility(visibility)}
          onChange={value => onForeignChange(value)}
        />
      </th>
      <th>
        <InputButton
          inputClassName={styles.elements}
          buttonClassName={styles.elements}
          text={nativeLanguage}
          visibility={nativeVisibility}
          changeVisibility={visibility => setNativeVisibility(visibility)}
          onChange={value => onNativeChange(value)}
        />
      </th>
    </tr>
  );
};
