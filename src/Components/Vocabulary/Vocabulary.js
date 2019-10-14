import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { VocabularyTable } from "../VocabularyTable";
import { NewWord } from "../NewWord";

import axios from "axios";

import style from "./Vocabulary.module.css";

const VocabularyContainer = ({ dispatch, folder, wordCounter }) => {
  const [newWordTable, setNewWordTable] = useState(false);
  const [isAble, setIsAble] = useState("able");
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
    <div>
      <table>
        <tbody>
          <VocabularyTable folder={folder} />
          {newWordTable && (
            <tr className={style.addWords}>
              <td>
                <NewWord
                  folder={folder}
                  word="foreign"
                  isAble={isAble}
                  setIsAble={() => setIsAble("disable")}
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
          )}
        </tbody>
      </table>
      {!newWordTable && (
        <button onClick={() => setNewWordTable(!newWordTable)}>
          Add new words
        </button>
      )}{" "}
    </div>
  );
};

const mapStateProps = state => ({
  vocabulary: state.addNewFolder.vocabulary,
  wordCounter: state.smallActions.wordCounter
});

export const Vocabulary = connect(mapStateProps)(VocabularyContainer);
