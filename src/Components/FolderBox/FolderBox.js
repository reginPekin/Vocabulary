import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useDispatch } from "react-redux";

import { deleteFolder, renameFolder } from "../../utils/folderUtils";
import { increaseWordCounter } from "../../utils/smallActions";

import style from "./FolderBox.module.css";

export const FolderBox = ({ folder, wordCounter }) => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [visibility, setVisibility] = useState(true);
  const changeVisibility = () => {
    setVisibility(!visibility);
  };
  return (
    <div>
      {visibility && (
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
      )}
      {!visibility && (
        <div>
          <form
            onSubmit={event => {
              axios.patch(
                "http://localhost:4000/vocabulary/folders/" + folder.folderId,
                { folderName: text }
              );
              dispatch(renameFolder(folder.folderId, text));
              setText("");
              changeVisibility();
              event.preventDefault();
            }}
          >
            <input
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
      )}
    </div>
  );
};
