import React, { useState } from "react";

import styles from "./InfoBox.module.css";

import { Button } from "../Button";
import { EditingInput } from "../EditingInput";

export const InfoBox = ({ onRename, name }) => {
  const [visibility, setVisibility] = useState(true);
  const changeVisibility = () => setVisibility(!visibility);

  if (!visibility)
    return (
      <EditingInput
        inputClassName={styles.inputClassName}
        value={name}
        changeVisibility={changeVisibility}
        onSubmit={value => onRename(value)}
      />
    );
  return (
    <Button
      onClick={() => changeVisibility()}
      buttonClassName={styles.buttonClassName}
    >
      {name}
    </Button>
  );
};
