import React from "react";
import { connect } from "react-redux";

import { VocabularyTable } from "../vocabularyTable";

// import styles from "./VocabularyWindow.module.css";

const VocabularyWindowContainer = ({ vocabulary }) => {
  return <VocabularyTable vocabulary={vocabulary} />;
};

const mapStateProps = state => ({
  vocabulary: state.addNewFolder.array
});

export const VocabularyWindow = connect(mapStateProps)(
  VocabularyWindowContainer
);
