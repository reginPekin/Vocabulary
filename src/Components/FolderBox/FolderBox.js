import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { connect } from "react-redux";

import { deleteFolder, renameFolder } from "../../utils/folderUtils";

import style from "./FolderBox.module.css";

const FolderBoxContainer = ({ folder, dispatch, wordCounter }) => {
  const [text, setText] = useState("");
  const [visibility, setVisibility] = useState(true);
  return (
    <div>
      {visibility && (
        <div className={style.buttonsDiv}>
          <Link to={`/${folder.folderId}/${folder.folderName}`}>
            <button
              onClick={() => {
                if (folder.words === undefined) {
                  dispatch({
                    type: "INCREASE_WORD_COUNTER",
                    wordCounter: wordCounter
                  });
                }
              }}
              className={style.boxFolder}
            >
              {folder.folderName}
            </button>
          </Link>
          <button onClick={() => setVisibility(!visibility)}>Edit me!</button>
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
        <form
          onSubmit={event => {
            axios.patch(
              "http://localhost:4000/vocabulary/folders/" + folder.folderId,
              { folderName: text }
            );
            dispatch(renameFolder(folder.folderId, text));
            setText("");
            setVisibility(!visibility);
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
      )}
    </div>
  );
};

const mapStateProps = state => ({
  wordCounter: state.smallActions.wordCounter
});

export const FolderBox = connect(mapStateProps)(FolderBoxContainer);
