import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useDispatch } from "react-redux";

import { deleteFolder, renameFolder } from "../../utils/folderUtils";
import { increaseWordCounter } from "../../utils/smallActions";

import style from "./FolderBox.module.css";

const FolderButton = ({ folder, wordCounter, dispatch, changeVisibility }) => {
  return (
    <div className={style.buttonsDiv}>
      <Link to={`/${folder.folderId}/${folder.folderName}`}>
        <button
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
      <button
        onClick={() => {
          axios
            .delete(
              "http://localhost:4000/vocabulary/folders/" + folder.folderId
            )
            .then(dispatch(deleteFolder(folder.folderId)))
            .catch(err => console.log(err));
        }}
      >
        Delete me :c
      </button>
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
          axios.patch(
            "http://localhost:4000/vocabulary/folders/" + folder.folderId,
            { folderName: text }
          );
          dispatch(renameFolder(folder.folderId, text));

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

export const FolderBox = ({ folder, wordCounter }) => {
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
