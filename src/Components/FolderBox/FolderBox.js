import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { deleteFolder, renameFolder } from "../../utils/folderUtils";
import { increaseWordCounter } from "../../utils/smallActions";

import * as sdk from "../../sdk";

import style from "./FolderBox.module.css";

const FolderButton = ({
  folder,
  wordCounter,
  dispatch,
  changeVisibility,
  currentFolderId
}) => {
  dispatch({ type: "KEEP_FOLDER", folderId: folder.folderId });

  return (
    <div className={style.buttonsDiv}>
      <Link to={`/${folder.folderId}/${folder.folderName}`}>
        <button
          style={{
            backgroundColor:
              parseInt(currentFolderId) === folder.folderId
                ? "#D4D4D4"
                : "white"
          }}
          onClick={() => {
            if (folder.words === undefined) {
              dispatch(increaseWordCounter(wordCounter));
            }
          }}
          className={style.boxFolder}
        >
          {folder.folderName}
        </button>
      </Link>
      <button onClick={() => changeVisibility()}>Edit me!</button>
      <Link to="/">
        <button
          onClick={() => {
            sdk
              .deleteFolder(folder)
              .then(dispatch(deleteFolder(folder.folderId)))
              .catch(err => console.log(err));
          }}
        >
          Delete me :c
        </button>
      </Link>
    </div>
  );
};

const FolderInput = ({ folder, dispatch, changeVisibility }) => {
  const [text, setText] = useState(folder.folderName);

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
            .then(dispatch(renameFolder(folder.folderId, text)));
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

export const FolderBox = ({ folder, wordCounter, currentFolderId }) => {
  const dispatch = useDispatch();

  const [visibility, setVisibility] = useState(true);

  const changeVisibility = () => setVisibility(!visibility);

  if (visibility)
    return (
      <FolderButton
        folder={folder}
        wordCounter={wordCounter}
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
