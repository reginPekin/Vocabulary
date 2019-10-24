import React from "react";
import { connect } from "react-redux";

import { Vocabulary } from "../Vocabulary";
import { InfoBox } from "../InfoBox";

export const VocabularyWindowContainer = ({ folders, history }) => {
  const index = history.location.pathname.indexOf("/", 2);
  const id = parseInt(history.location.pathname.slice(1, index), 10);

  return (
    <div>
      {folders
        .filter(folder => folder.id === id)
        .map((folder, key) => {
          if (folder.words === undefined) folder.words = [];
          return (
            <div key={key}>
              <InfoBox name={folder.name} />
              <Vocabulary folder={folder} folderId={id} />
            </div>
          );
        })}
    </div>
  );
};

const mapStateProps = state => ({ folders: state.addNewFolder.folders });

export const VocabularyWindow = connect(mapStateProps)(
  VocabularyWindowContainer
);
