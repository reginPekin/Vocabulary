import React from "react";
import { connect } from "react-redux";

import { FolderBox } from "../FolderBox";
import { FolderSearch } from "../FolderSearch";
import { AddFolder } from "../AddFolder";
import { AllWordsFolder } from "../AllWordsFolder";

import styles from "./FolderWindow.module.css";

const FolderWindowContainer = ({ vocabulary, searchText }) => {
  console.log(vocabulary);
  return (
    <div className={styles.folderWindow}>
      <AllWordsFolder />
      {vocabulary.length > 5 && <FolderSearch />}

      {vocabulary.map(
        (folder, key) =>
          (searchText === "" ||
            folder.folderName
              .toLowerCase()
              .indexOf(searchText.toLowerCase()) !== -1) && (
            <FolderBox folder={folder} key={key} />
          )
      )}

      <AddFolder />
    </div>
  );
};

const mapStateProps = state => ({
  searchText: state.smallActions.searchText,
  vocabulary: state.addNewFolder.array
});

export const FolderWindow = connect(mapStateProps)(FolderWindowContainer);
