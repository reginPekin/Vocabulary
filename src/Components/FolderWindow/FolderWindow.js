import React from "react";
import { connect } from "react-redux";

import { FolderBox } from "../FolderBox";
import { FolderSearch } from "../FolderSearch";

import styles from "./FolderWindow.module.css";

const FolderWindowContainer = ({ vocabulary, searchText }) => {
  return (
    <div className={styles.folderWindow}>
      <FolderSearch />
      {vocabulary.map(
        (folder, key) =>
          (searchText === "" ||
            folder.folderName
              .toLowerCase()
              .indexOf(searchText.toLowerCase()) !== -1) && (
            <FolderBox folder={folder} key={key} />
          )
      )}
    </div>
  );
};

const mapStateProps = state => ({
  searchText: state.smallActions.searchText
});

export const FolderWindow = connect(mapStateProps)(FolderWindowContainer);
