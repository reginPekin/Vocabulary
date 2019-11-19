import React, { useState } from "react";

import styles from "./InfoBox.module.css";

import { InputButton } from "../InputButton";

export const InfoBox = ({ onRename, name }) => {
  const [visibility, setVisibility] = useState(true);
  const changeVisibility = () => setVisibility(!visibility);
  return (
    <InputButton
      visibility={visibility}
      changeVisibility={() => changeVisibility()}
      onChange={value => onRename(value)}
      text={name}
      inputClassName={styles.inputClassName}
      buttonClassName={styles.buttonClassName}
    />
  );
};
