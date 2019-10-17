import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { VocabularyTable } from "../VocabularyTable";
import { NewWord } from "../NewWord";
import { getWordsArray } from "../../utils/wordUtils";
import { increaseWordCounter } from "../../utils/smallActions";

import axios from "axios";

import style from "./Vocabulary.module.css";

export const Vocabulary = ({ folder, wordCounter }) => {
  const dispatch = useDispatch();

  const [newWordTable, setNewWordTable] = useState(false);
  const [isAble, setIsAble] = useState("able");
  useEffect(() => {
    axios
      .get("http://localhost:4000/vocabulary/folders/" + folder.folderId)
      .then(response => dispatch(getWordsArray(folder.folderId, response.data)))
      .catch(error => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, wordCounter]);

  return (
    <div>
      <table>
        <tbody>
          <VocabularyTable folder={folder} dispatch={dispatch} />
          {newWordTable && (
            <tr className={style.addWords}>
              <td>
                <NewWord
                  folder={folder}
                  word="foreign"
                  isAble={isAble}
                  setIsAble={() => setIsAble("disable")}
                  dispatch={dispatch}
                  reset={() => dispatch(increaseWordCounter(wordCounter))}
                />
              </td>
              <td>
                <NewWord
                  folder={folder}
                  word="native"
                  reset={() => dispatch(increaseWordCounter(wordCounter))}
                  dispatch={dispatch}
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
