import React, { useState } from "react";

import * as sdk from "../../sdk";

import styles from "./InfoBox.module.css";

import { Button } from "../Button";
import { EditingInput } from "../EditingInput";

export const InfoBox = ({ folder, onRename = () => null }) => {
  const [visibility, setVisibility] = useState(true);
  const changeVisibility = () => setVisibility(!visibility);

  if (visibility)
    return (
      <Button
        onClick={() => changeVisibility()}
        value={folder.name}
        buttonClassName={styles.buttonClassName}
      />
    );

  return (
    <EditingInput
      inputClassName={styles.inputClassName}
      value={folder.name}
      changeVisibility={changeVisibility}
      onSubmit={value =>
        sdk.renameFolder(folder.id, value).then(() => onRename(value))
      }
    />
  );
};
