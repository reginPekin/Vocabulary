import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NotFoundBoundary, useLoadingRoute, useCurrentRoute } from "react-navi";

import { FolderBox } from "../FolderBox";
import { FolderSearch } from "../FolderSearch";
import { NewFolder } from "../NewFolder";
import { LoadingBar } from "../LoadingBar";

import { getFoldersNames } from "../../utils/folderUtils";
import { getCurrentFolderId, isSuitable } from "../../utils/smallActions";

import * as sdk from "../../sdk";

import styles from "./Menu.module.css";

const MenuContainerRouter = ({ children, dispatch, searchText, folders }) => {
  let loadingRoute = useLoadingRoute();
  let route = useCurrentRoute();
  const currentFolderId = getCurrentFolderId(route.url.pathname);

  useEffect(() => {
    sdk.getFolderNames().then(response => {
      console.log("response", response);
      dispatch(getFoldersNames(response));
    });
  }, [dispatch]);

  return (
    <div className={styles.folderWindow}>
      <LoadingBar isActive={!!loadingRoute} />
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
      <NewFolder />
      <main>
        <NotFoundBoundary render={renderNotFound}>
          {children || null}
        </NotFoundBoundary>
      </main>
    </div>
  );
};

function renderNotFound() {
  return (
    <div className="App-error">
      <h1>404 - Not Found</h1>
    </div>
  );
}

const mapStateProps = state => ({
  searchText: state.smallActions.searchText,
  folders: state.addNewFolder.folders
});

const MenuRouter = connect(mapStateProps)(MenuContainerRouter);

export const Menu = MenuRouter;
