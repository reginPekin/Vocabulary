import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-navi";

import { useDispatch } from "react-redux";

import { deleteFolder, renameFolder } from "../../utils/folderUtils";

import * as sdk from "../../sdk";

import style from "./FolderBox.module.css";

const FolderButton = ({
  folder,
  dispatch,
  changeVisibility,
  currentFolderId
}) => {
  return (
    <div className={style.buttonsDiv}>
      <Link href={`/voc/${folder.id}`} activeClassName="active">
        <button
          style={{
            backgroundColor:
              parseInt(currentFolderId) === folder.id ? "#D4D4D4" : "white"
          }}
          className={style.boxFolder}
        >
          {folder.name}
        </button>
      </Link>
      <button onClick={() => changeVisibility()}>Edit me!</button>
      <Link href="/" activeClassName="active">
        <button
          onClick={() => {
            sdk.deleteFolder(folder).then(dispatch(deleteFolder(folder.id)));
          }}
        >
          Delete me :c
        </button>
      </Link>
    </div>
  );
};

const FolderInput = ({ folder, dispatch, changeVisibility }) => {
  const [text, setText] = useState(folder.name);

  const inputRename = useRef(null);

  // Listener on Click Outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (inputRename.current && !inputRename.current.contains(event.target)) {
        changeVisibility();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
          sdk
            .renameFolder(folder, text)
            .then(dispatch(renameFolder(folder.id, text)));
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
      <button
        onClick={() => {
          changeVisibility();
          setText("");
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export const FolderBox = ({ folder, currentFolderId }) => {
  const dispatch = useDispatch();

  const [visibility, setVisibility] = useState(true);

  const changeVisibility = () => setVisibility(!visibility);

  if (visibility)
    return (
      <FolderButton
        folder={folder}
        dispatch={dispatch}
        changeVisibility={changeVisibility}
        currentFolderId={currentFolderId}
      />
    );
  else
    return (
      <FolderInput
        folder={folder}
        dispatch={dispatch}
        changeVisibility={changeVisibility}
      />
    );
};
