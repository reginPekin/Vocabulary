import React, { useState, useRef, useEffect } from "react";

import { editWord } from "../../utils/wordUtils";

import * as sdk from "../../sdk";

export const NewWordName = ({
  folderId,
  wordPair,
  wordLanguage,
  dispatch,
  changeVisibility,
  word
}) => {
  const [text, setText] = useState(word);
  const inputRef = useRef(null);
  console.log(word);
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
          wordId: wordPair.wordId,
          folderId,
          renamedWord: text
        };
        sdk
          .editWord(folderId, wordPair, newName)
          .then(
            dispatch(editWord(wordLanguage, wordPair.wordId, folderId, text))
          );
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
