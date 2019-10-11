import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { connect } from "react-redux";

import style from "./FolderBox.module.css";

const FolderBoxContainer = ({ folder, dispatch, wordCounter }) => {
  const [text, setText] = useState("");
  console.log(text);
  // console.log(wordCounter);
  return (
    <div>
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
        <button>Edit me!</button>
        <button
          onClick={() => {
            axios
              .delete(
                "http://localhost:4000/vocabulary/folders/" + folder.folderId
              )
              .then(
                dispatch({ type: "DELETE_FOLDER", folderId: folder.folderId })
              )
              .catch(err => console.log(err));
          }}
        >
          Delete me :c
        </button>
      </div>

      <form
        onSubmit={event => {
          dispatch({
            type: "RENAME_FOLDER",
            folderId: folder.folderId,
            folderName: text
          });
          setText("");
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
    </div>
  );
};

const mapStateProps = state => ({
  wordCounter: state.smallActions.wordCounter
});

export const FolderBox = connect(mapStateProps)(FolderBoxContainer);
