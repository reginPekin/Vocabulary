import React from "react";
import { connect } from "react-redux";

import { VocabularyTable } from "../VocabularyTable";
// import styles from "./VocabularyWindow.module.css";

const VocabularyWindowContainer = ({ vocabulary, history }) => {
  console.log("asdasdas", history.location.pathname);
  return (
    <div>
      {vocabulary.map((folder, key) => (
        <VocabularyTable folder={folder} key={key} />
      ))}
    </div>
  );
};

const mapStateProps = state => ({
  vocabulary: state.addNewFolder.array
});

export const VocabularyWindow = connect(mapStateProps)(
  VocabularyWindowContainer
);
