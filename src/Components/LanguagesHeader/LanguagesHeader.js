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
          inputClassName={styles.inputClassName}
          buttonClassName={styles.inputClassName}
          text={foreignLanguage}
          visibility={foreignVisibility}
          changeVisibility={() => setForeignVisibility(!foreignVisibility)}
          onChange={value => onForeignChange(value)}
        />
      </th>
      <th>
        <InputButton
          inputClassName={styles.inputClassName}
          buttonClassName={styles.inputClassName}
          text={nativeLanguage}
          visibility={nativeVisibility}
          changeVisibility={() => setNativeVisibility(!nativeVisibility)}
          onChange={value => onNativeChange(value)}
        />
      </th>
    </tr>
  );
};
