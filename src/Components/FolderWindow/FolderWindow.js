import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import axios from "axios";

import { FolderBox } from "../FolderBox";
import { FolderSearch } from "../FolderSearch";
import { NewFolder } from "../NewFolder";
import { AllWordsFolder } from "../AllWordsFolder";

import styles from "./FolderWindow.module.css";

export const FolderWindowContainer = ({ dispatch }) => {
  const [vocabulary, setVocabulary] = useState([]);

  const [reset, setReset] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:4000/vocabulary/")
      .then(response => {
        setVocabulary(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [reset]);
  console.log(vocabulary);
  return (
    <div className={styles.folderWindow}>
      <AllWordsFolder />
      {vocabulary.length > 5 && <FolderSearch />}

      {vocabulary.map(
        (folder, key) => (
          // (searchText === "" ||
          //   folder.folderName
          //     .toLowerCase()
          //     .indexOf(searchText.toLowerCase()) !== -1) && (
          <FolderBox
            folder={folder}
            key={key}
            reset={() => setReset(reset + 1)}
            onDispatch={() =>
              dispatch({
                type: "ADD_NEW_FOLDER",
                vocabulary: vocabulary
              })
            }
          />
        )
        // )
      )}

      <NewFolder
        reset={() => setReset(reset + 1)}
        onDispatch={() => {
          dispatch({
            type: "ADD_NEW_FOLDER",
            vocabulary: vocabulary
          });
        }}
      />
    </div>
  );
};

const mapStateProps = state => ({
  voc: state.addNewFolder.array
});

export const FolderWindow = connect(mapStateProps)(FolderWindowContainer);
