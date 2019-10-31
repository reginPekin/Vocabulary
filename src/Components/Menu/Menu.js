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
  let route = useCurrentRoute();
  const currentFolderId = getCurrentFolderId(route.url.href);

  useEffect(() => {
    sdk.getFolderNames().then(response => {
      setFolderNames(response);
    });
  }, [beam]);

  return (
    <div className={styles.folderWindow}>
      {folderNames.map(
        (folder, key) => (
          // isSuitable(searchText, folder) && (
          <FolderBox
            folder={folder}
            key={key}
            isActive={currentFolderId}
            onDelete={folderId => {
              setFolderNames(
                folderNames.filter(folder => folderId !== folder.id)
              );
            }}
          />
        )
        // )
      )}
      <NewFolder
        onAdd={newFolder => setFolderNames([newFolder, ...folderNames])}
      />
    </div>
  );
};

const mapStateProps = state => ({
  beam: state.smallActions.beam
});

export const Menu = connect(mapStateProps)(MenuContainer);
