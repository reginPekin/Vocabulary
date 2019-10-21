import React, { useEffect } from "react";
import { connect } from "react-redux";

import { FolderBox } from "../FolderBox";
import { FolderSearch } from "../FolderSearch";
import { NewFolder } from "../NewFolder";
import { AllWordsFolder } from "../AllWordsFolder";

import { getFoldersNames } from "../../utils/folderUtils";

import * as sdk from "../../sdk";

import styles from "./FolderWindow.module.css";

const FolderWindowContainer = ({
  dispatch,
  searchText,
  Vocabulary,
  wordCounter
}) => {
  useEffect(() => {
    sdk.getFolderNames().then(response => dispatch(getFoldersNames(response)));
  }, [dispatch]);

  return (
    <div className={styles.folderWindow}>
      <AllWordsFolder />
      {Vocabulary.length > 5 && <FolderSearch />}

      {Vocabulary.map(
        (folder, key) =>
          (searchText === "" ||
            folder.folderName
              .toLowerCase()
              .indexOf(searchText.toLowerCase()) !== -1) && (
            <FolderBox folder={folder} key={key} wordCounter={wordCounter} />
          )
        // )
      )}

      <NewFolder />
    </div>
  );
};

const mapStateProps = state => ({
  searchText: state.smallActions.searchText,
  Vocabulary: state.addNewFolder.vocabulary,
  wordCounter: state.smallActions.wordCounter
});

export const FolderWindow = connect(mapStateProps)(FolderWindowContainer);
