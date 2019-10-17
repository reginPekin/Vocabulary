import React, { useState } from "react";

import { editWord } from "../../utils/wordUtils";

import axios from "axios";

export const NewWordName = ({
  folderId,
  wordId,
  word,
  dispatch,
  changeVisibility
}) => {
  const [text, setText] = useState("");
  return (
    <form
      onSubmit={event => {
        axios
          .patch(
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
          )
          .then(dispatch(editWord(word, wordId, folderId, text)));
        changeVisibility();
        setText("");
        event.preventDefault();
      }}
    >
      <input
        type="text"
        value={text}
        onChange={event => setText(event.target.value)}
        autoFocus
      />
    </form>
  );
};
