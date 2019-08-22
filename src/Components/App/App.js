import React from "react";

import styles from "./App.module.css";

import { FolderWindow } from "../folderWindow";
import { VocabularyWindow } from "../vocabularyWindow";

export const App = () => {
  return (
    <div className={styles.app}>
      <FolderWindow />
      <VocabularyWindow />
    </div>
  );
};
