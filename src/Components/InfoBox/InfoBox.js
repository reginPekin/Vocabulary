import React, { useState } from "react";
import Select from "react-select";

import styles from "./InfoBox.module.css";

import { InputButton } from "../InputButton";

export const InfoBox = ({ onRename, name, onSort, sortMethod }) => {
  const [visibility, setVisibility] = useState(true);
  const changeVisibility = () => setVisibility(!visibility);
  let defaultValue = "";
  switch (sortMethod) {
    case "date":
      defaultValue = "Date";
      break;
    case "foreignWords":
      defaultValue = "Foreign words";
      break;
    case "nativeWords":
      defaultValue = "Native words";
      break;
    case "speechPart":
      defaultValue = "Speech parts";
      break;
    default:
      console.log("none");
  }

  const options = [
    { value: "date", label: "Date" },
    { value: "foreignWords", label: "Foreign words" },
    { value: "nativeWords", label: "Native words" },
    { value: "speechPart", label: "Speech parts" }
  ];
  return (
    <div className={styles.infoBox}>
      <InputButton
        visibility={visibility}
        changeVisibility={() => changeVisibility()}
        onChange={value => onRename(value)}
        text={name}
        inputClassName={styles.inputClassName}
        formClassName={styles.formClassName}
        buttonClassName={styles.buttonClassName}
      />

      <label className={styles.sort}>
        Sort by:
        <Select
          className={styles.sortSelect}
          options={options}
          onChange={event => {
            onSort(event.value);
          }}
          defaultValue={{ label: defaultValue, value: sortMethod }}
        />
      </label>
    </div>
  );
};
