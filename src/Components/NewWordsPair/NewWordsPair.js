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
  const formRef = useRef(null);

  useOnClickOutside(formRef, () => {
    setIsClicked(false);
    dropInputRefValues(foreignInputRef, nativeInputRef);
  });

  if (!isClicked) {
    return (
      <Button
        buttonClassName={styles.newFolderButtom}
        onClick={() => setIsClicked(true)}
      >
        <section className={styles.section}>
          <img src={Plus} alt="Plus" width={17} height={17} />
          <span>Add new words pair</span>
        </section>
      </Button>
    );
  }

  return (
    <table ref={formRef}>
      <tbody>
        <tr>
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
              onSubmit={event => {
                event.preventDefault();
                if (!foreignInputRef.current || !nativeInputRef.current) {
                  return;
                }
                onAdd(
                  foreignInputRef.current.value,
                  nativeInputRef.current.value
                );
                dropInputRefValues(foreignInputRef, nativeInputRef);
                foreignInputRef.current.focus();
              }}
            >
              <input className={styles.input} ref={nativeInputRef} />
            </form>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
