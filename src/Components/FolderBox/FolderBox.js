import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-navi";

import * as sdk from "../../sdk";

import styles from "./FolderBox.module.css";

import { Button } from "../Button";

import Menu from "../../images/menu.png";

export const FolderBox = ({ folder, onDelete = () => null }) => {
  const divRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changeVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    const handleClickOutside = event => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        changeVisibility();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [changeVisibility]);

  return (
    <>
      {isVisible && <div className={styles.glass} />}
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
            <img src={Menu} alt="Menu" height="30" />
          </Button>
        </div>
        {isVisible && (
          <div ref={divRef} className={styles.contextMenu}>
            <Link href="/" className={styles.deleteLink}>
              <Button
                buttonClassName={styles.menuButton}
                onClick={() => {
                  sdk.deleteFolder(folder.id).then(() => onDelete(folder.id));
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
    </>
  );
};
