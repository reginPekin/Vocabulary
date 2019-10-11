import React from "react";

import { connect } from "react-redux";

import axios from "axios";

import style from "./DisplayPair.module.css";

const PairOfWordsContainer = ({ folderId, wordPair, dispatch }) => {
  return (
    <tr className={style.PairOfWords}>
      <td>{wordPair.foreignWord}</td>
      <td>{wordPair.nativeWord}</td>
      <td>
        <button
          onClick={() => {
            let wordInf = {
              folderId: folderId,
              wordId: wordPair.wordId
            };
            axios.post(
              "http://localhost:4000/vocabulary/folders/" +
                folderId +
                "/words/" +
                wordPair.wordId,
              wordInf
            );

            dispatch({
              type: "DELETE_WORDS",
              folderId: folderId,
              wordId: wordPair.wordId
            });
            console.log(wordPair.wordId);
          }}
        >
          Don't delete me, please :c
        </button>
      </td>
    </tr>
  );
};

const mapStateProps = state => ({
  vocabulary: state.addNewFolder.vocabulary
});

export const PairOfWords = connect(mapStateProps)(PairOfWordsContainer);
