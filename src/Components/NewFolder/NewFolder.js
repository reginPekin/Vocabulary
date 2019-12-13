import React, { useState, useRef } from "react";

import Plus from "../../images/blackPlus.png";

import { Button } from "../Button";
import { Popup } from "../Popup";

import { dropInputRefValues } from "../../utils";

import styles from "./NewFolder.module.css";

export const NewFolder = ({ onAdd }) => {
  const [isVisible, setIsVisible] = useState(false);
  const changeVisibility = () => setIsVisible(!isVisible);

  const folderNameRef = useRef(null);
  const foreignInputRef = useRef(null);
  const nativeInputRef = useRef(null);

  return (
    <>
      <Button
        onClick={() => changeVisibility(!isVisible)}
        buttonClassName={styles.newFolderButton}
      >
        <section className={styles.span}>
          <img src={Plus} alt="Plus" width={15} />
          <span> Add folder </span>
        </section>
      </Button>
      <Popup
        positionClassName={styles.popup}
        isVisible={isVisible}
        changeVisibility={() => changeVisibility()}
      >
        <form
          className={styles.form}
          onSubmit={event => {
            event.preventDefault();
            foreignInputRef.current.focus();
          }}
        >
          <span>Name of the folder:</span>
          <input className={styles.input} ref={folderNameRef} autoFocus />
        </form>

        <form
          className={styles.form}
          onSubmit={event => {
            event.preventDefault();
            nativeInputRef.current.focus();
          }}
        >
          <span>Foreign language:</span>
          <input className={styles.input} ref={foreignInputRef} />
        </form>

        <form
          className={styles.form}
          onSubmit={event => {
            event.preventDefault();
            if (!foreignInputRef.current || !nativeInputRef.current) {
              return;
            }
            onAdd(
              folderNameRef.current.value,
              foreignInputRef.current.value,
              nativeInputRef.current.value
            );
            dropInputRefValues(foreignInputRef, nativeInputRef, folderNameRef);
            setIsVisible(false);
          }}
        >
          <span>Native language:</span>
          <input className={styles.input} ref={nativeInputRef} />
        </form>
      </Popup>
    </>
  );
};
