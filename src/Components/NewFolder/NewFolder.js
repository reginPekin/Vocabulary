import React, { useState, useRef } from "react";

import * as sdk from "../../sdk";
import { useNavigation } from "react-navi";

export const NewFolder = ({ onAdd }) => {
  const navigation = useNavigation();
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
          .then(onAdd(newFolder))
          .then(() => {
            navigation.navigate(`/voc/${newFolder.id}`);
          });

        ref.current.blur();
        setText("");
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
