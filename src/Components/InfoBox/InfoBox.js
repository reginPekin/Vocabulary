import React, { useState, useRef } from "react";
import Select from "react-select";

import styles from "./InfoBox.module.css";

import { InputButton } from "../InputButton";

export const InfoBox = ({ onRename, name, onSort, sortMethod }) => {
  const sortRef = useRef(null);
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
      <form
        onSubmit={event => {
          event.preventDefault();
          onSort(sortRef.current.value);
        }}
      >
        <label className={styles.sort}>
          Sort by:
          <Select
            ref={sortRef}
            options={options}
            onChange={event => {
              onSort(event.value);
            }}
            defaultValue={{ label: defaultValue }}
          />
        </label>
        <input type="submit" value="Submit" style={{ visibility: "hidden" }} />
      </form>
    </div>
  );
};
