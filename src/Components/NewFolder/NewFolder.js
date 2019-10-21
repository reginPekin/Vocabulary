import React, { useState, useRef } from "react";

import { useDispatch } from "react-redux";

import { createFolder } from "../../utils/folderUtils";

import * as sdk from "../../sdk";

export const NewFolder = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const ref = useRef(null);
  return (
    <form
      onSubmit={event => {
        const newFolder = {
          folderName: text,
          date: Date.now(),
          folderId: Math.floor(Math.random() * Math.floor(100000000)),
          words: []
        };

        sdk
          .createFolder(newFolder)
          .then(() => dispatch(createFolder(newFolder)));

        setText("");
        ref.current.blur();
        event.preventDefault();
      }}
    >
      <input
        ref={ref}
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
