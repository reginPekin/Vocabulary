import React, { useRef } from "react";

import { useOnClickOutside } from "../../utils/hooks";
import { useSelect } from "../../utils/hooks";

import cx from "classnames";

import styles from "./EditInput.module.css";

export const EditingInput = ({
  value = "",
  changeVisibility = () => null,
  onSubmit = () => null,
  inputClassName = null,
  formClassName = null
}) => {
  const inputRef = useRef(null);

  useSelect(inputRef);
  useOnClickOutside(inputRef, () => changeVisibility());

  return (
    <form
      className={formClassName}
      onSubmit={event => {
        onSubmit(value);
        changeVisibility();
        inputRef.current.value = "";
        event.preventDefault();
      }}
    >
      <input
        className={cx(styles.input, inputClassName)}
        ref={inputRef}
        defaultValue={value}
        autoFocus
      />
    </form>
  );
};
