import React from "react";

import styles from "./App.module.css";

import { FolderWindow } from "../FolderWindow";
import { VocabularyWindow } from "../VocabularyWindow";

export const App = () => {
  return (
    <div className={styles.app}>
      <FolderWindow />
      <VocabularyWindow />
    </div>
  );
};
