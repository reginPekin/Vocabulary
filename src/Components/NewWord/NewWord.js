import React, { useState, useRef } from "react";

import { addNewWord } from "../../utils/wordUtils";

import axios from "axios";

export const NewWord = ({ folder, word, dispatch }) => {
  const [text, setText] = useState("");
  const folderLength = folder.words.length;
  const ref = useRef(null);

  return (
    <form
      onSubmit={event => {
        if (word === "foreign") {
          if (
            folderLength > 0 &&
            folder.words[folderLength - 1].foreignWord === undefined
          ) {
            dispatch(
              addNewWord(
                folder.folderId,
                folder.words[folderLength - 1].wordId,
                "foreign",
                text,
                folder.words[folderLength - 1].nativeWord
              )
            );
            let newWord = {
              foreignWord: text,
              nativeWord: folder.words[folderLength - 1].nativeWord,
              wordId: folder.words[folderLength - 1].wordId
            };
            axios.post(
              "http://localhost:4000/vocabulary/folders/" +
                folder.folderId +
                "/words",
              newWord
            );
          } else {
            dispatch(
              addNewWord(
                folder.folderId,
                Math.floor(Math.random() * Math.floor(100000000)),
                "foreign",
                text
              )
            );
          }
        } else if (word === "native") {
          if (
            folderLength > 0 &&
            folder.words[folderLength - 1].nativeWord === undefined
          ) {
            dispatch(
              addNewWord(
                folder.folderId,
                folder.words[folderLength - 1].wordId,
                "native",
                folder.words[folderLength - 1].foreignWord,
                text
              )
            );
            let newWord = {
              nativeWord: text,
              foreignWord: folder.words[folderLength - 1].foreignWord,
              wordId: folder.words[folderLength - 1].wordId
            };
            axios.post(
              "http://localhost:4000/vocabulary/folders/" +
                folder.folderId +
                "/words",
              newWord
            );
          } else {
            dispatch(
              addNewWord(
                folder.folderId,
                Math.floor(Math.random() * Math.floor(100000000)),
                "native",
                undefined,
                text
              )
            );
          }
        }
        ref.current.blur();
        setText("");
        event.preventDefault();
      }}
    >
      <input
        ref={ref}
        type="text"
        placeholder="Add word"
        value={text}
        onChange={event => {
          setText(event.target.value);
        }}
      />
    </form>
  );
};
