import React from "react";
import { Link } from "react-navi";

import * as sdk from "../../sdk";

import styles from "./FolderBox.module.css";

const FolderButton = ({ folder, isActive, onDelete }) => {
  return (
    <div>
      <Link href={`/voc/${folder.id}`} activeClassName="active">
        <button
          style={{
            border:
              parseInt(isActive) === folder.id
                ? "2px solid #808080"
                : "2px solid white"
          }}
          className={styles.boxFolder}
        >
          {folder.name}
        </button>
      </Link>
      <Link href="/" activeClassName="active">
        <button
          onClick={() => {
            sdk.deleteFolder(folder.id).then(() => onDelete(folder.id));
          }}
        >
          X
        </button>
      </Link>
    </div>
  );
};

export const FolderBox = ({ folder, isActive, onDelete = () => null }) => {
  return (
    <FolderButton folder={folder} isActive={isActive} onDelete={onDelete} />
  );
};
