import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { FolderBox } from "../FolderBox";
import { NewFolder } from "../NewFolder";

import * as sdk from "../../sdk";

import styles from "./Menu.module.css";

const MenuContainer = ({ beam }) => {
  const [folderNames, setFolderNames] = useState([]);

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
