import React, { useState, useRef } from "react";
import { Link } from "react-navi";

import { useOnClickOutside } from "../../utils/hooks";

import styles from "./FolderBox.module.css";

import { Button } from "../Button";

import Menu from "../../images/menu.svg";

export const FolderBox = ({ folder, onDelete = () => null }) => {
  const divRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const changeVisibility = () => setIsVisible(!isVisible);

  useOnClickOutside(divRef, () => changeVisibility());

  return (
    <section className={styles.boxFolder}>
      <div className={styles.mainPart}>
        <Link
          href={`/voc/${folder.id}`}
          activeClassName={styles.activeFolder}
          className={styles.link}
        >
          {folder.name}
        </Link>
        <Button
          buttonClassName={styles.button}
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        >
          <img src={Menu} alt="Menu" width={27} />
        </Button>
      </div>
      {isVisible && <div className={styles.glass} />}
      {isVisible && (
        <div ref={divRef} className={styles.contextMenu}>
          <Link href="/" className={styles.deleteLink}>
            <Button
              buttonClassName={styles.menuButton}
              onClick={() => {
                onDelete();
                changeVisibility();
              }}
            >
              Delete
            </Button>
          </Link>
          <Button buttonClassName={styles.menuButton}>Edit</Button>
        </div>
      )}
    </section>
  );
};
