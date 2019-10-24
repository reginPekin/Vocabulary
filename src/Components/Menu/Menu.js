import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { FolderBox } from "../FolderBox";
import { FolderSearch } from "../FolderSearch";
import { NewFolder } from "../NewFolder";

import { getFoldersNames } from "../../utils/folderUtils";
import { getCurrentFolderId, isSuitable } from "../../utils/smallActions";

import * as sdk from "../../sdk";

import styles from "./Menu.module.css";

const MenuContainerRouter = ({ dispatch, searchText, folders, history }) => {
  const currentFolderId = getCurrentFolderId(history);

  useEffect(() => {
    sdk.getFolderNames().then(response => dispatch(getFoldersNames(response)));
  }, [dispatch]);

  return (
    <div className={styles.folderWindow}>
      {folders.length > 5 && <FolderSearch />}

      {folders.map(
        (folder, key) =>
          isSuitable(searchText, folder) && (
            <FolderBox
              folder={folder}
              key={key}
              currentFolderId={currentFolderId}
            />
          )
      )}

      <NewFolder history={history} />
    </div>
  );
};

const mapStateProps = state => ({
  searchText: state.smallActions.searchText,
  folders: state.addNewFolder.folders
});

const MenuRouter = connect(mapStateProps)(MenuContainerRouter);

export const Menu = withRouter(MenuRouter);
