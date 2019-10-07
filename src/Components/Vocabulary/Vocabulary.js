import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { VocabularyTable } from "../VocabularyTable";
import { NewWord } from "../NewWord";

import axios from "axios";

import style from "./Vocabulary.module.css";

const VocabularyContainer = ({ dispatch, folder }) => {
  const [reset, setReset] = useState(0);
  useEffect(() => {
    axios.get("http://localhost:4000/vocabulary/" + folder._id).then(response =>
      dispatch({
        type: "ADD_WORDS_ARRAY",
        folderId: folder.folderId,
        words: response.data
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, reset]);

  return (
    <table>
      <tbody>
        <VocabularyTable folder={folder} />

        <tr className={style.addWords}>
          <td>
            <NewWord
              folder={folder}
              word="foreign"
              reset={() => setReset(reset + 1)}
            />
          </td>
          <td>
            <NewWord
              folder={folder}
              word="native"
              reset={() => setReset(reset + 1)}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const mapStateProps = state => ({
  vocabulary: state.addNewFolder.vocabulary
});

export const Vocabulary = connect(mapStateProps)(VocabularyContainer);
