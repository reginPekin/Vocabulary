import React, { useState, useRef } from "react";

import styles from "./InfoBox.module.css";

import { InputButton } from "../InputButton";

export const InfoBox = ({ onRename, name, onSort }) => {
  const sortRef = useRef(null);
  const [visibility, setVisibility] = useState(true);
  const changeVisibility = () => setVisibility(!visibility);
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
          <select name="select" ref={sortRef}>
            <option value="date">Date</option>
            <option value="foreignWords">Foreign words</option>
            <option value="nativeWords">Native words</option>
            <option value="speechPart">Speech parts</option>
          </select>
        </label>
        <input type="submit" value="Submit" style={{ visibility: "hidden" }} />
      </form>
    </div>
  );
};
