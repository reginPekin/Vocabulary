import React, { useState } from "react";

import { useNavigation } from "react-navi";

import Plus from "../../images/darkPlus.png";

import { Button } from "../Button";
import { EditingInput } from "../EditingInput";

import styles from "./NewFolder.module.css";

import * as sdk from "../../sdk";

export const NewFolder = ({ onAdd }) => {
  const navigation = useNavigation();
  const [visibility, setVisibility] = useState(true);
  const changeVisibility = () => setVisibility(!visibility);

  if (visibility) {
    return (
      <Button
        value={
          <div className={styles.span}>
            <img src={Plus} alt="Plus" width="15" />
            <span> Add folder </span>
          </div>
        }
        onClick={() => changeVisibility(!setVisibility)}
        buttonClassName={styles.newFolderButtom}
      />
    );
  } else {
    return (
      <EditingInput
        formClassName={styles.form}
        inputClassName={styles.newFolderInput}
        changeVisibility={changeVisibility}
        onSubmit={text => {
          const newFolder = {
            name: text,
            date: Date.now(),
            id: Math.floor(Math.random() * Math.floor(100000000)),
            words: []
          };

          sdk
            .createFolder(newFolder)
            .then(onAdd(newFolder))
            .then(() => {
              navigation.navigate(`/voc/${newFolder.id}`);
            });
        }}
      />
    );
  }
};
