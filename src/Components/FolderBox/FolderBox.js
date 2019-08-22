import React from "react";
import { connect } from "react-redux";

const FolderBoxContainer = ({ folder, dispatch }) => {
  return (
    <div>
      <button onClick={() => dispatch({ type: "CLOSE_ALL" })}>
        {folder.folderName}
      </button>
    </div>
  );
};

const mapStateProps = state => ({
  vocabulary: state.addNewFolder.array
});

export const FolderBox = connect(mapStateProps)(FolderBoxContainer);
