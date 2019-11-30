import React, { useState, useRef } from "react";

import styles from "./NewWordsPair.module.css";

import { useOnClickOutside } from "../../utils/hooks";
import { dropInputRefValues } from "../../utils";

import Plus from "../../images/darkPlus.png";

import { Button } from "../Button";

export const NewWordsPair = ({ onAdd }) => {
  const [isClicked, setIsClicked] = useState(false);

  const foreignInputRef = useRef(null);
  const nativeInputRef = useRef(null);
  const speechPartRef = useRef(null);
  const formRef = useRef(null);
  const datalistRef = useRef(null);

  useOnClickOutside(formRef, () => {
    setIsClicked(false);
    dropInputRefValues(foreignInputRef, nativeInputRef);
  });

  if (!isClicked) {
    return (
      <tr>
        <td colSpan={2} className={styles.colSpan}>
          <Button
            buttonClassName={styles.newFolderButtom}
            onClick={() => setIsClicked(true)}
          >
            <section className={styles.section}>
              <img src={Plus} alt="Plus" width={17} height={17} />
              <span>Add new words pair</span>
            </section>
          </Button>
        </td>
      </tr>
    );
  }

  return (
    <tr ref={formRef}>
      <td className={styles.rightColumn}>
        <form
          className={styles.form}
          onSubmit={event => {
            event.preventDefault();
            nativeInputRef.current.focus();
          }}
        >
          <input className={styles.input} ref={foreignInputRef} autoFocus />
        </form>
      </td>
      <td>
        <form
          className={styles.form}
          onSubmit={event => {
            event.preventDefault();
            speechPartRef.current.focus();
            datalistRef.current.focus();
          }}
        >
          <input className={styles.input} ref={nativeInputRef} />
        </form>
      </td>
      <td className={styles.speechParts}>
        <form
          className={styles.form}
          onSubmit={event => {
            event.preventDefault();
            if (
              !foreignInputRef.current ||
              !nativeInputRef.current ||
              !speechPartRef.current
            ) {
              return;
            }
            onAdd(
              foreignInputRef.current.value,
              nativeInputRef.current.value,
              speechPartRef.current.value
            );
            dropInputRefValues(foreignInputRef, nativeInputRef, speechPartRef);
            foreignInputRef.current.focus();
          }}
        >
          <input
            list="browsers"
            name="browser"
            placeholder="noun"
            ref={speechPartRef}
          />
          <datalist id="browsers" ref={datalistRef}>
            <option value="noun" />
            <option value="adjective" />
            <option value="verb" />
            <option value="adverb" />
            <option value="pronoun" />
            <option value="preposition" />
            <option value="conjuction" />
            <option value="interjection" />
          </datalist>
        </form>
      </td>
    </tr>
  );
};
