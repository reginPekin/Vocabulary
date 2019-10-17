import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import styles from "./FolderSearch.module.css";
import { setSearchText } from "../../utils/smallActions";

export const FolderSearch = () => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  return (
    <input
      placeholder="Find the folder"
      type="text"
      onFocus={() => setText("")}
      value={text}
      onChange={event => {
        setText(event.target.value);
        dispatch(setSearchText(event.target.value));
      }}
    />
  );
};
