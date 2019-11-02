import React from "react";
import { Link } from "react-navi";

import * as sdk from "../../sdk";

import styles from "./FolderBox.module.css";

export const FolderBox = ({ folder, onDelete = () => null }) => {
  return (
    <div>
      <Link
        href={`/voc/${folder.id}`}
        className={styles.boxFolder}
        activeClassName={styles.activeFolder}
      >
        {folder.name}
      </Link>
      <Link href="/">
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
