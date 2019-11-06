import React, { useState } from "react";
import { Link } from "react-navi";

import * as sdk from "../../sdk";

import styles from "./FolderBox.module.css";

import { Button } from "../Button";

export const FolderBox = ({ folder, onDelete = () => null }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className={styles.boxFolder}>
      <Link
        href={`/voc/${folder.id}`}
        activeClassName={styles.activeFolder}
        className={styles.link}
      >
        {folder.name}
      </Link>
      <Button
        buttonClassName={styles.button}
        value=":"
        onClick={() => setIsVisible(!isVisible)}
      />
      {isVisible && <div>Hi</div>}
      {/* <Link href="/">
        <button
          onClick={() => {
            sdk.deleteFolder(folder.id).then(() => onDelete(folder.id));
          }}
        >
          X
        </button>
      </Link> */}
    </div>
  );
};
