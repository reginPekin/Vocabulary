import React, { useEffect } from "react";
import { connect } from "react-redux";

import { VocabularyTable } from "../VocabularyTable";
import { NewWord } from "../NewWord";

import axios from "axios";

import style from "./Vocabulary.module.css";

const VocabularyContainer = ({ dispatch, folder, wordCounter }) => {
  useEffect(() => {
    axios
      .get("http://localhost:4000/vocabulary/folders/" + folder.folderId)
      .then(response =>
        dispatch({
          type: "ADD_WORDS_ARRAY",
          folderId: folder.folderId,
          words: response.data
        })
      )
      .catch(error => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, wordCounter]);

  return (
    <table>
      <tbody>
        <VocabularyTable folder={folder} />

        <tr className={style.addWords}>
          <td>
            <NewWord
              folder={folder}
              word="foreign"
              reset={() =>
                dispatch({
                  type: "INCREASE_WORD_COUNTER",
                  wordCounter: wordCounter
                })
              }
            />
          </td>
          <td>
            <NewWord
              folder={folder}
              word="native"
              reset={() =>
                dispatch({
                  type: "INCREASE_WORD_COUNTER",
                  wordCounter: wordCounter
                })
              }
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const mapStateProps = state => ({
  vocabulary: state.addNewFolder.vocabulary,
  wordCounter: state.smallActions.wordCounter
});

export const Vocabulary = connect(mapStateProps)(VocabularyContainer);
