import React, { useState } from "react";
import { connect } from "react-redux";

const NewWordContainer = ({ dispatch, vocabulary, intFolderId, word }) => {
  const [text, setText] = useState("");
  const vocabularyLength = vocabulary[intFolderId].words.length;

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (word === "foreign") {
          if (
            vocabularyLength > 0 &&
            vocabulary[intFolderId].words[vocabularyLength - 1].foreignWord ===
              undefined
          ) {
            dispatch({
              type: "ADD_NEW_WORD",
              word: word,
              foreignWord: text,
              folderId: intFolderId,
              wordId: vocabularyLength - 1
            });
          } else {
            dispatch({
              type: "ADD_NEW_WORD",
              word: word,
              foreignWord: text,
              folderId: intFolderId,
              wordId: vocabularyLength
            });
          }
        } else if (word === "native") {
          if (
            vocabularyLength > 0 &&
            vocabulary[intFolderId].words[vocabularyLength - 1].nativeWord ===
              undefined
          ) {
            dispatch({
              type: "ADD_NEW_WORD",
              word: word,
              nativeWord: text,
              folderId: intFolderId,
              wordId: vocabularyLength - 1
            });
          } else {
            dispatch({
              type: "ADD_NEW_WORD",
              word: word,
              nativeWord: text,
              folderId: intFolderId,
              wordId: vocabularyLength
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
  vocabulary: state.addNewFolder.array
});

export const NewWord = connect(mapStateProps)(NewWordContainer);
