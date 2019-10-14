import React, { useState } from "react";

import { connect } from "react-redux";

import { addNewWord } from "../../utils/addNewWord";

import axios from "axios";

export const NewWordContainer = ({
  folder,
  word,
  dispatch,
  isAble,
  setIsAble
}) => {
  const [text, setText] = useState("");
  const folderLength = folder.words.length;
  console.log(text);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        console.log(text);
        // reset();
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
