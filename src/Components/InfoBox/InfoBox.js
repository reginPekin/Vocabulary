import React, { useState, useRef } from "react";
import Select from "react-select";

import styles from "./InfoBox.module.css";

import { InputButton } from "../InputButton";
import { Button } from "../Button";

import Repeat from "../../images/repeat.svg";

export const InfoBox = ({
  onRename,
  name,
  onSort,
  sortMethod,
  onClick,
  sortDirection
}) => {
  const [visibility, setVisibility] = useState(true);
  const changeVisibility = () => setVisibility(!visibility);
  const selectRef = useRef(null);
  let defaultValue = "";
  switch (sortMethod) {
    case "date":
      defaultValue = "Date";
      break;
    case "foreign":
      defaultValue = "Foreign words";
      break;
    case "native":
      defaultValue = "Native words";
      break;
    case "speech":
      defaultValue = "Speech parts";
      break;
    default:
      console.log("none");
  }

  const options = [
    { value: "date", label: "Date" },
    { value: "foreign", label: "Foreign words" },
    { value: "native", label: "Native words" },
    { value: "speech", label: "Speech parts" }
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
          ref={selectRef}
          className={styles.sortSelect}
          options={options}
          onChange={event => {
            onSort(event.value, sortDirection);
          }}
          defaultValue={{ label: defaultValue, value: sortMethod }}
        />
        <Button
          onClick={() => {
            onClick();
            onSort(selectRef.current.state.value.value, sortDirection);
          }}
        >
          <img
            src={Repeat}
            alt="repeat"
            width={15}
            style={{ transform: "rotate(90deg)" }}
          />
        </Button>
      </label>
    </div>
  );
};
