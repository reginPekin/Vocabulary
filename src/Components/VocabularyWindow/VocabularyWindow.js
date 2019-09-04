import React from "react";
import { connect } from "react-redux";

import { VocabularyTable } from "../VocabularyTable";
import { AddWord } from "../AddWord";

import style from "./VocabularyWindow.module.css";
// import styles from "./VocabularyWindow.module.css";

const VocabularyWindowContainer = ({ vocabulary, history }) => {
  const index = history.location.pathname.indexOf("/", 2);
  const id = history.location.pathname.slice(1, index);

  if (id.length > 0) {
    return (
      <div className={style.vocabularyWindow}>
        <VocabularyTable folder={vocabulary[id]} key={id} />
        <AddWord folderId={id} />
      </div>
    );
  } else {
    return (
      <div>
        {vocabulary.map((folder, key) => (
          <VocabularyTable folder={folder} key={key} />
        ))}
      </div>
    );
  }
};

const mapStateProps = state => ({
  vocabulary: state.addNewFolder.array
});

export const VocabularyWindow = connect(mapStateProps)(
  VocabularyWindowContainer
);
