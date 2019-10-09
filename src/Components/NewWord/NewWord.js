import React, { useState } from "react";

import axios from "axios";

export const NewWord = ({ folder, word, reset }) => {
  const [text, setText] = useState("");
  const folderLength = folder.words.length;

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        // reset();
        if (word === "foreign") {
          if (
            folderLength > 0 &&
            folder.words[folderLength - 1].foreignWord === undefined
          ) {
            let newWord = {
              foreignWord: text,
              id: folder.folderId,
              nativeWord: folder.words[folderLength - 1].nativeWord,
              wordLanguage: "foreign"
            };

            axios
              .post(
                "http://localhost:4000/vocabulary/secondWordInPair",
                newWord
              )
              .then(() => reset());
          } else {
            let newWord = {
              foreignWord: text,
              id: folder.folderId
            };
            axios
              .post("http://localhost:4000/vocabulary/newWord", newWord)
              .then(() => reset());
          }
        } else if (word === "native") {
          if (
            folderLength > 0 &&
            folder.words[folderLength - 1].nativeWord === undefined
          ) {
            let newWord = {
              nativeWord: text,
              id: folder.folderId,
              foreignWord: folder.words[folderLength - 1].foreignWord,
              wordLanguage: "native"
            };
            axios
              .post(
                "http://localhost:4000/vocabulary/secondWordInPair",
                newWord
              )
              .then(() => reset());
          } else {
            let newWord = {
              nativeWord: text,
              id: folder.folderId
            };
            axios
              .post("http://localhost:4000/vocabulary/newWord", newWord)
              .then(() => reset());
          }
        }

        setText("");
      }}
    >
      <input
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
