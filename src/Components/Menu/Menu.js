import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useCurrentRoute } from "react-navi";

import { FolderBox } from "../FolderBox";
import { NewFolder } from "../NewFolder";

import { getCurrentFolderId } from "../../utils/smallActions";

import * as sdk from "../../sdk";

import styles from "./Menu.module.css";

const MenuContainer = ({ beam }) => {
  const [folderNames, setFolderNames] = useState([]);
  const route = useCurrentRoute();
  const currentFolderId = getCurrentFolderId(route.url.href);

  useEffect(() => {
    sdk.getFolderNames().then(response => {
      setFolderNames(response);
    });
  }, [beam]);

  return (
    <div className={styles.folderWindow}>
      <NewFolder
        className={styles.newFolder}
        onAdd={newFolder => setFolderNames([newFolder, ...folderNames])}
      />
      {folderNames.map(
        (folder, key) => (
          // isSuitable(searchText, folder) && (
          <FolderBox
            folder={folder}
            key={key}
            isActive={parseInt(currentFolderId) === folder.id}
            onDelete={folderId => {
              setFolderNames(
                folderNames.filter(folder => folderId !== folder.id)
              );
            }}
          />
        )
        // )
      )}
    </div>
  );
};

const mapStateProps = state => ({
  beam: state.smallActions.beam
});

export const Menu = connect(mapStateProps)(MenuContainer);
