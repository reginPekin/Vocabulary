import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { FolderBox } from "../FolderBox";
import { FolderSearch } from "../FolderSearch";
import { NewFolder } from "../NewFolder";
import { AllWordsFolder } from "../AllWordsFolder";

import { getFoldersNames } from "../../utils/folderUtils";

import * as sdk from "../../sdk";

import styles from "./FolderWindow.module.css";

const FolderWindowContainerRouter = ({
  dispatch,
  searchText,
  Vocabulary,
  wordCounter,
  history
}) => {
  const currentFolderLink = history.location.pathname;
  const currentFolderId = currentFolderLink.slice(
    1,
    currentFolderLink.indexOf("/", 2)
  );
  useEffect(() => {
    sdk.getFolderNames().then(response => dispatch(getFoldersNames(response)));
  }, [dispatch]);

  return (
    <div className={styles.folderWindow}>
      <AllWordsFolder currentFolderId={currentFolderId} />
      {Vocabulary.length > 5 && <FolderSearch />}

      {Vocabulary.map(
        (folder, key) =>
          (searchText === "" ||
            folder.folderName
              .toLowerCase()
              .indexOf(searchText.toLowerCase()) !== -1) && (
            <FolderBox
              folder={folder}
              key={key}
              wordCounter={wordCounter}
              currentFolderId={currentFolderId}
            />
          )
        // )
      )}

      <NewFolder history={history} />
    </div>
  );
};

const mapStateProps = state => ({
  searchText: state.smallActions.searchText,
  Vocabulary: state.addNewFolder.vocabulary,
  wordCounter: state.smallActions.wordCounter
});

const FolderWindowRouter = connect(mapStateProps)(FolderWindowContainerRouter);

export const FolderWindow = withRouter(FolderWindowRouter);
