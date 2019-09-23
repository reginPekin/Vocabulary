import { connect } from "react-redux";
import React, { useState } from "react";
import axios from "axios";

export const NewFolderContainer = ({ vocabulary, reset, onDispatch }) => {
  const [text, setText] = useState("");
  console.log(vocabulary);
  return (
    <form
      onSubmit={event => {
        const newFolder = {
          folderName: text,
          folderId: vocabulary.length,
          words: []
        };

        axios
          .post("http://localhost:4000/vocabulary/add", newFolder)
          .then(() => reset());

        onDispatch();
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
  vocabulary: state.addNewFolder.array
});

export const NewFolder = connect(mapStateProps)(NewFolderContainer);
