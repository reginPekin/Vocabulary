import React, { useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";

import { createFolder } from "../../utils/folderUtils";

export const NewFolder = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  return (
    <form
      onSubmit={event => {
        const newFolder = {
          folderName: text,
          date: Date.now(),
          folderId: Math.floor(Math.random() * Math.floor(100000000)),
          words: []
        };

        axios
          .post("http://localhost:4000/vocabulary/folders", newFolder)
          .then(() => dispatch(createFolder(newFolder)));

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
