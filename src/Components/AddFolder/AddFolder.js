import { connect } from "react-redux";
import React, { useState } from "react";

export const AddFolderContainer = ({ dispatch, vocabulary }) => {
  const [text, setText] = useState("");
  return (
    <form
      onSubmit={event => {
        dispatch({
          type: "ADD_NEW_FOLDER",
          id: vocabulary.length,
          folderName: text
        });
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

export const AddFolder = connect(mapStateProps)(AddFolderContainer);