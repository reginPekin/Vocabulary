import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import axios from "axios";

import { FolderBox } from "../FolderBox";
import { FolderSearch } from "../FolderSearch";
import { NewFolder } from "../NewFolder";
import { AllWordsFolder } from "../AllWordsFolder";
import { getFoldersNames } from "../../utils/folderUtils";

import styles from "./FolderWindow.module.css";

export const FolderWindowContainer = ({ dispatch, searchText, Vocabulary }) => {
  const [reset, setReset] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:4000/vocabulary/folders/names")
      .then(response => {
        dispatch(getFoldersNames(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  }, [dispatch, reset]);

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
            <FolderBox
              folder={folder}
              key={key}
              reset={() => setReset(reset + 1)}
            />
          )
        // )
      )}

      <NewFolder reset={() => setReset(reset + 1)} />
    </div>
  );
};

const mapStateProps = state => ({
  searchText: state.smallActions.searchText,
  Vocabulary: state.addNewFolder.vocabulary
});

export const FolderWindow = connect(mapStateProps)(FolderWindowContainer);
