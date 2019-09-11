import React, { useState } from "react";
import { connect } from "react-redux";

const AddWordContainer = ({ dispatch, vocabulary, intFolderId, word }) => {
  const [text, setText] = useState("");
  // const intFolderId = parseInt(folderId, 10);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (word === "foreign") {
          console.log(vocabulary[intFolderId].words.length);
          dispatch({
            type: "ADD_NEW_WORD",
            word: word,
            foreignWord: text,
            folderId: intFolderId,
            wordId: vocabulary[intFolderId].words.length - 2
          });
          console.log(vocabulary[intFolderId].words.length - 2);
        } else if (word === "native") {
          dispatch({
            type: "ADD_NEW_WORD",
            word: word,
            nativeWord: text,
            folderId: intFolderId,
            wordId: vocabulary[intFolderId].words.length - 1
          });
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

export const AddWord = connect(mapStateProps)(AddWordContainer);
