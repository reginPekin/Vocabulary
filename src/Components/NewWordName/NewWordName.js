import React, { useState } from "react";

import { connect } from "react-redux";

import axios from "axios";

const NewWordNameContainer = ({ folderId, wordId, word, dispatch }) => {
  const [text, setText] = useState("");
  return (
    <form
      onSubmit={event => {
        axios.patch(
          "http://localhost:4000/vocabulary/folders/" +
            folderId +
            "/words/edit/" +
            wordId,
          {
            word,
            wordId,
            folderId,
            renamedWord: text
          }
        );
        dispatch({
          type: "EDIT_WORD_NAME",
          word,
          wordId,
          folderId,
          renamedWord: text
        });
        setText("");
        event.preventDefault();
      }}
    >
      <input
        type="text"
        value={text}
        onChange={event => setText(event.target.value)}
      />
    </form>
  );
};

const mapState = state => ({
  vocabulary: state.addNewFolder.vocabulary
});

export const NewWordName = connect(mapState)(NewWordNameContainer);
