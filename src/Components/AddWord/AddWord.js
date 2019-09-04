import React, { useState } from "react";
import { connect } from "react-redux";

const AddWordContainer = ({ dispatch, vocabulary, folderId }) => {
  const [text, setText] = useState("");

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        dispatch({
          type: "ADD_NEW_WORD",
          folderId: parseInt(folderId, 10),
          words: text,
          wordId: vocabulary[folderId].words.length
        });
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
