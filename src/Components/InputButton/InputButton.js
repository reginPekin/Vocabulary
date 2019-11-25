import React, { useRef } from "react";

import { useOnClickOutside } from "../../utils/hooks";
import { useSelect } from "../../utils/hooks";

import cx from "classnames";

import styles from "./InputButton.module.css";

import { Button } from "../Button";

export const InputButton = ({
  visibility,
  changeVisibility,
  onChange,
  text,
  inputClassName = null,
  buttonClassName = null,
  formClassName = null,
  style = null
}) => {
  if (!visibility) {
    return (
      <EditingInput
        formClassName={formClassName}
        inputClassName={inputClassName}
        value={text}
        changeVisibility={() => changeVisibility(true)}
        onSubmit={value => {
          onChange(value);
        }}
      />
    );
  }
  return (
    <Button
      style={style}
      onClick={() => changeVisibility(false)}
      buttonClassName={buttonClassName}
    >
      {text}
    </Button>
  );
};

const EditingInput = ({
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
        onSubmit(inputRef.current.value);
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
