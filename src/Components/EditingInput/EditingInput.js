import React, { useState, useEffect, useRef } from "react";

import cx from "classnames";

import styles from "./EditInput.module.css";

export const EditingInput = ({
  value = "",
  changeVisibility = () => null,
  onSubmit = () => null,
  inputClassName = null
}) => {
  const [text, setText] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && inputRef) {
      inputRef.current.select();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = event => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        changeVisibility();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [changeVisibility]);

  return (
    <form
      onSubmit={event => {
        onSubmit(text);
        changeVisibility();
        setText("");
        event.preventDefault();
      }}
    >
      <input
        className={cx(styles.input, inputClassName)}
        ref={inputRef}
        type="text"
        value={text}
        onChange={event => setText(event.target.value)}
        autoFocus
      />
    </form>
  );
};
