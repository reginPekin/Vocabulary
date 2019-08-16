import React from "react";
import { connect } from "react-redux";

import { FolderWindow } from "../FolderWindow";

export const AppContainer = ({ Vocabulary }) => {
  return (
    <div>
      vocabulary: {Vocabulary}
      {/* {vocabulary.map((folder, key) => (
        <FolderWindow key={key} folder={folder} />
      ))} */}
    </div>
  );
};

const mapStateToProps = state => ({
  Vocabulary: state.array
});
export const App = connect(mapStateToProps)(AppContainer);
