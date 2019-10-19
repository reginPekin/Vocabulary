import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useDispatch } from "react-redux";

import { deleteFolder, renameFolder } from "../../utils/folderUtils";
import { increaseWordCounter } from "../../utils/smallActions";

import style from "./FolderBox.module.css";

// const dispatch = useDispatch();

const useOutsideAlerter = (ref, changeVisibility) => {
  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      changeVisibility();
    }
  };

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
};

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
  const [text, setText] = useState("");
  const ref = useRef(null);
  useOutsideAlerter(ref, changeVisibility);
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
          ref.current.blur();
          event.preventDefault();
        }}
      >
        <input
          ref={ref}
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

  const changeVisibility = () => {
    setVisibility(!visibility);
  };

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
