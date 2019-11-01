import React, { useState, useEffect, useRef } from "react";

import styles from "./EditInput.module.css";

export const EditingInput = ({
  initialState,
  changeVisibility = () => null,
  onSubmit = () => null
}) => {
  const [text, setText] = useState(initialState);
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
        className={styles.input}
        ref={inputRef}
        type="text"
        value={text}
        onChange={event => setText(event.target.value)}
        autoFocus
      />
    </form>
  );
};
