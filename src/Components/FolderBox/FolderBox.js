import React from "react";
import { Link } from "react-navi";

import * as sdk from "../../sdk";

import styles from "./FolderBox.module.css";

export const FolderBox = ({ folder, isActive, onDelete = () => null }) => {
  console.log(isActive);
  return (
    <div>
      <Link href={`/voc/${folder.id}`} activeClassName="active">
        <div
          style={{
            border: isActive ? "2px solid #808080" : "2px solid white"
          }}
          className={styles.boxFolder}
        >
          {folder.name}
        </div>
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
