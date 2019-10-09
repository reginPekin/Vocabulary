import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import axios from "axios";

import { FolderBox } from "../FolderBox";
import { FolderSearch } from "../FolderSearch";
import { NewFolder } from "../NewFolder";
import { AllWordsFolder } from "../AllWordsFolder";

import styles from "./FolderWindow.module.css";

export const FolderWindowContainer = ({ dispatch, searchText }) => {
  const [vocabulary, setVocabulary] = useState([]);
  const [reset, setReset] = useState(0);
  console.log(reset);

  useEffect(() => {
    axios
      .get("http://localhost:4000/vocabulary/gettingFolders")
      .then(response => {
        setVocabulary(response.data);
        dispatch({
          type: "ADD_NEW_VOCABULARY",
          vocabulary: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, [dispatch, reset]);

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
  searchText: state.smallActions.searchText
});

export const FolderWindow = connect(mapStateProps)(FolderWindowContainer);
