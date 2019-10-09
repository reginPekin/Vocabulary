import React, { useState } from "react";
import axios from "axios";

export const NewFolder = ({ reset }) => {
  const [text, setText] = useState("");

  return (
    <form
      onSubmit={event => {
        const newFolder = {
          folderName: text,
          folderId: Math.floor(Math.random() * Math.floor(1000000)),
          words: []
        };
        axios
          .post("http://localhost:4000/vocabulary/newFold", newFolder)
          .then(() => reset());

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
