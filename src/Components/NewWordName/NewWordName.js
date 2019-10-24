import React, { useState, useRef, useEffect } from "react";

import { editWord } from "../../utils/wordUtils";

import * as sdk from "../../sdk";

export const NewWordName = ({
  folderId,
  wordId,
  wordLanguage,
  dispatch,
  changeVisibility,
  word
}) => {
  const [text, setText] = useState(word);
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
          word: wordLanguage,
          wordId,
          id: folderId,
          renamedWord: text
        };
        sdk
          .editWord(folderId, wordId, newName)
          .then(dispatch(editWord(wordLanguage, wordId, folderId, text)));
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
