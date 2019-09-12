import React from "react";
import { connect } from "react-redux";

import { Vocabulary } from "../Vocabulary";
import { InfoBox } from "../InfoBox";
import { VocabularyTable } from "../VocabularyTable";

const VocabularyWindowContainer = ({ vocabulary, history }) => {
  const index = history.location.pathname.indexOf("/", 2);
  const id = history.location.pathname.slice(1, index);

  if (id.length > 0) {
    return (
      <div>
        <InfoBox name={vocabulary[id].folderName} />
        <Vocabulary folder={vocabulary[id]} key={id} folderId={id} />
      </div>
    );
  } else {
    return (
      <div>
        <InfoBox name="Full vocabulary" />
        <table>
          {vocabulary.map((folder, key) => (
            <VocabularyTable folder={folder} key={key} />
          ))}
        </table>
      </div>
    );
  }
};

const mapStateProps = state => ({
  vocabulary: state.addNewFolder.array
});

export const VocabularyWindow = connect(mapStateProps)(
  VocabularyWindowContainer
);
