import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigation } from "react-navi";

import { FolderBox } from "../FolderBox";
import { NewFolder } from "../NewFolder";

import * as sdk from "../../sdk";

import styles from "./Menu.module.css";

const MenuContainer = ({ beam }) => {
  const [folderNames, setFolderNames] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    sdk.getFolderNames().then(response => {
      setFolderNames(response);
    });
  }, [beam]);

  return (
    <div className={styles.folderWindow}>
      <NewFolder
        onAdd={text => {
          const newFolder = {
            name: text,
            foreignLanguage: "Foreign language",
            nativeLanguage: "Native language"
          };
          sdk.createFolder(newFolder).then(data => {
            const newFolder = data.data[0];
            setFolderNames([newFolder, ...folderNames]);
            navigation.navigate(`/voc/${newFolder.id}`);
          });
        }}
      />
      {folderNames.map((folder, key) => (
        <FolderBox
          folder={folder}
          key={key}
          onDelete={() => {
            sdk
              .deleteFolder(folder.id)
              .then(() =>
                setFolderNames(
                  folderNames.filter(
                    filterFolder => folder.id !== filterFolder.id
                  )
                )
              );
          }}
        />
      ))}
    </div>
  );
};

const mapStateProps = state => ({
  beam: state.smallActions.beam
});

export const Menu = connect(mapStateProps)(MenuContainer);
