import React, { useState, useRef, useEffect } from "react";

import { editWord } from "../../utils/wordUtils";

import * as sdk from "../../sdk";

export const NewWordName = ({
  folderId,
  wordPair,
  word,
  dispatch,
  changeVisibility
}) => {
  const [text, setText] = useState("cc");
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
        const newName = {
          word,
          wordId: wordPair.wordId,
          folderId,
          renamedWord: text
        };
        sdk
          .editWord(folderId, wordPair, newName)
          .then(dispatch(editWord(word, wordPair.wordId, folderId, text)));
        changeVisibility();
        setText("");
        event.preventDefault();
      }}
    >
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={event => setText(event.target.value)}
        autoFocus
      />
    </form>
  );
};
