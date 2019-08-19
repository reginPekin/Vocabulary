import React from "react";
import { connect } from "react-redux";

import styles from "./App.module.css";

import { FolderWindow } from "../FolderWindow";
import { VocabularyWindow } from "../VocabularyWindow";

export const AppContainer = ({ Vocabulary }) => {
  return (
    <div className={styles.app}>
      <FolderWindow vocabulary={Vocabulary} />
      <VocabularyWindow />
    </div>
  );
};

const mapStateToProps = state => ({
  Vocabulary: state.showPage.array
});
export const App = connect(mapStateToProps)(AppContainer);
