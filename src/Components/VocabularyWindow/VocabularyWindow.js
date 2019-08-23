import React from "react";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";

import { VocabularyTable } from "../vocabularyTable";

// import styles from "./VocabularyWindow.module.css";

const VocabularyWindowContainer = ({ vocabulary }) => {
  vocabulary.map((folder, key) => (
    <Switch>
      <VocabularyTable folder={folder} key={key} />
    </Switch>
  ));
};

const mapStateProps = state => ({
  vocabulary: state.addNewFolder.array
});

export const VocabularyWindow = connect(mapStateProps)(
  VocabularyWindowContainer
);
