import React from "react";

import { VocabularyTable } from "../VocabularyTable";
import { NewWord } from "../NewWord";

import style from "./Vocabulary.module.css";

export const Vocabulary = ({ folder }) => {
  console.log("folder: ", folder);
  return (
    <table>
      <tbody>
        <VocabularyTable folder={folder} />

        <tr className={style.addWords}>
          <td>
            <NewWord folder={folder} word="foreign" />
          </td>
          <td>
            <NewWord folder={folder} word="native" />
          </td>
        </tr>
      </tbody>
    </table>
  );
};
