import React from "react";
import { connect } from "react-redux";

import { Vocabulary } from "../Vocabulary";
import { InfoBox } from "../InfoBox";

export const VocabularyWindowContainer = ({ vocabulary, history }) => {
  const index = history.location.pathname.indexOf("/", 2);
  const id = parseInt(history.location.pathname.slice(1, index), 10);

  return (
    <div>
      {vocabulary
        .filter(folder => folder.folderId === id)
        .map((folder, key) => {
          return (
            <div key={key}>
              <InfoBox name={folder.folderName} />
              <Vocabulary folder={folder} folderId={id} />
            </div>
          );
        })}
    </div>
  );
};

const mapStateProps = state => ({
  vocabulary: state.addNewFolder.vocabulary
});

export const VocabularyWindow = connect(mapStateProps)(
  VocabularyWindowContainer
);
