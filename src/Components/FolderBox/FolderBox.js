import React from "react";

import styles from "./FolderBox.module.css";

export const FolderBox = ({ folder }) => {
  return (
    <div className={styles.folderBox}>
      <button>{folder.folderName}</button>
    </div>
  );
};
