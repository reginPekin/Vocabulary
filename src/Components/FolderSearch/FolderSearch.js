import React, { useState } from "react";
import { connect } from "react-redux";
// import styles from "./FolderSearch.module.css";

const FolderSearchContainer = ({ dispatch }) => {
  const [text, setText] = useState("");

  return (
    <input
      placeholder="Find the folder"
      type="text"
      onFocus={() => setText("")}
      value={text}
      onChange={event => {
        setText(event.target.value);
        dispatch({
          type: "CHANGE_SEARCH_TEXT",
          searchText: event.target.value
        });
      }}
    />
  );
};

const mapStateProps = state => ({
  text: state.smallActions.searchText
});

export const FolderSearch = connect(mapStateProps)(FolderSearchContainer);
