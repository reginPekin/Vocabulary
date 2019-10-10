import React, { useState } from "react";
import axios from "axios";

import { connect } from "react-redux";

const NewFolderContainer = ({ dispatch }) => {
  const [text, setText] = useState("");

  return (
    <form
      onSubmit={event => {
        const newFolder = {
          folderName: text,
          folderId: Math.floor(Math.random() * Math.floor(100000000)),
          words: []
        };

        axios
          .post("http://localhost:4000/vocabulary/folders", newFolder)
          .then(() =>
            dispatch({ type: "ADD_NEW_FOLDER", newFolder: newFolder })
          );

        setText("");
        event.preventDefault();
      }}
    >
      <input
        type="text"
        placeholder="new folder"
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

export const NewFolder = connect(mapStateProps)(NewFolderContainer);
