import React, { useState, useRef } from "react";

import { useDispatch } from "react-redux";

import { createFolder } from "../../utils/folderUtils";

import * as sdk from "../../sdk";
import { useNavigation } from "react-navi";

export const NewFolder = ({ history }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const ref = useRef(null);
  return (
    <form
      onSubmit={event => {
        const newFolder = {
          name: text,
          date: Date.now(),
          id: Math.floor(Math.random() * Math.floor(100000000)),
          words: []
        };

        sdk
          .createFolder(newFolder)
          .then(() => dispatch(createFolder(newFolder)));
        setText("");
        navigation.navigate(`/${newFolder.id}/${newFolder.name}`);
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
