import React, { useState } from "react";

import { connect } from "react-redux";

import axios from "axios";

export const NewWordContainer = ({ folder, word, dispatch }) => {
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
            dispatch({
              type: "ADD_NEW_WORD",
              folderId: folder.folderId,
              wordId: folder.words[folderLength - 1].wordId,
              word: "foreign",
              foreignWord: text
            });
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
            dispatch({
              type: "ADD_NEW_WORD",
              folderId: folder.folderId,
              word: "foreign",
              wordId: Math.floor(Math.random() * Math.floor(100000000)),
              foreignWord: text
            });
          }
        } else if (word === "native") {
          if (
            folderLength > 0 &&
            folder.words[folderLength - 1].nativeWord === undefined
          ) {
            dispatch({
              type: "ADD_NEW_WORD",
              folderId: folder.folderId,
              wordId: folder.words[folderLength - 1].wordId,
              word: "native",
              nativeWord: text
            });
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
            dispatch({
              type: "ADD_NEW_WORD",
              folderId: folder.folderId,
              word: "native",
              wordId: Math.floor(Math.random() * Math.floor(100000000)),
              nativeWord: text
            });
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

const mapStateProps = state => ({
  vocabulary: state.addNewFolder.vocabulary
});

export const NewWord = connect(mapStateProps)(NewWordContainer);
