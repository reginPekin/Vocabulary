import React from "react";

import { FolderBox } from "../FolderBox";

export const FolderWindow = ({ vocabulary }) => {
  return (
    <div>
      {vocabulary.map((folder, key) => (
        <FolderBox folder={folder} key={key} />
      ))}
    </div>
  );
};
