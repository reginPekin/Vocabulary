import React, { useState, useEffect, useRef } from "react";

import * as sdk from "../../sdk";

// import style from "./InfoBox.module.css";

export const InfoBox = ({ folder, onRename = () => null }) => {
  const FolderInput = ({ folder, changeVisibility, onRename }) => {
    const [text, setText] = useState(folder.name);

    const inputRename = useRef(null);

    // Listener on Click Outside
    useEffect(() => {
      const handleClickOutside = event => {
        if (
          inputRename.current &&
          !inputRename.current.contains(event.target)
        ) {
          changeVisibility();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [changeVisibility]);

    useEffect(() => {
      if (inputRename && inputRename.current) {
        inputRename.current.select();
      }
    }, [inputRename]);

    return (
      <div>
        <form
          onSubmit={event => {
            sdk.renameFolder(folder.id, text).then(() => onRename(text));
            changeVisibility();
            setText("");
            inputRename.current.blur();
            event.preventDefault();
          }}
        >
          <input
            ref={inputRename}
            type="text"
            placeholder="rename me"
            value={text}
            onChange={event => {
              setText(event.target.value);
            }}
            autoFocus
          />
        </form>
      </div>
    );
  };

  const [visibility, setVisibility] = useState(true);

  const changeVisibility = () => setVisibility(!visibility);

  if (visibility)
    return <button onClick={() => changeVisibility()}>{folder.name}</button>;
  else
    return (
      <FolderInput
        changeVisibility={changeVisibility}
        onRename={onRename}
        folder={folder}
      />
    );
};
