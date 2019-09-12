import React from "react";

import { VocabularyTable } from "../VocabularyTable";
import { NewWord } from "../NewWord";

import style from "./Vocabulary.module.css";

export const Vocabulary = ({ folder, folderId }) => {
  return (
    <table>
      <tbody>
        <VocabularyTable folder={folder} />
        {folderId >= 0 && (
          <tr className={style.addWords}>
            <td>
              <NewWord intFolderId={parseInt(folderId, 10)} word="foreign" />
            </td>
            <td>
              <NewWord intFolderId={parseInt(folderId, 10)} word="native" />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
