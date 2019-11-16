import React, { useState } from "react";

import Plus from "../../images/blackPlus.png";

import { Button } from "../Button";
import { EditingInput } from "../EditingInput";

import styles from "./NewFolder.module.css";

export const NewFolder = ({ onAdd }) => {
  const [visibility, setVisibility] = useState(true);
  const changeVisibility = () => setVisibility(!visibility);

  if (!visibility) {
    return (
      <EditingInput
        formClassName={styles.form}
        inputClassName={styles.newFolderInput}
        changeVisibility={changeVisibility}
        onSubmit={text => onAdd(text)}
      />
    );
  }
  return (
    <Button
      onClick={() => changeVisibility(!setVisibility)}
      buttonClassName={styles.newFolderButtom}
    >
      <section className={styles.span}>
        <img src={Plus} alt="Plus" width={15} />
        <span> Add folder </span>
      </section>
    </Button>
  );
};
