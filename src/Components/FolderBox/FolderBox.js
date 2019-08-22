import React from "react";

export const FolderBox = ({ folder }) => {
  return (
    <div>
      <button>{folder.folderName}</button>
    </div>
  );
};
