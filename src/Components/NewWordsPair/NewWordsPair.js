import React, { useState, useRef, useEffect } from "react";

import styles from "./NewWordsPair.module.css";

import * as sdk from "../../sdk";

import Plus from "../../images/darkPlus.png";

import { Button } from "../Button";

export const NewWordsPair = ({ folderId, onAdd }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [foreignText, setForeignText] = useState("");
  const [nativeText, setNativeText] = useState("");
  const foreignInputRef = useRef(null);
  const nativeInputRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsClicked(!isClicked);
        setNativeText("");
        setForeignText("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isClicked]);

  return (
    <>
      {isClicked && (
        <table ref={formRef}>
          <tbody>
            <tr>
              <td>
                <form
                  onSubmit={event => {
                    event.preventDefault();
                    nativeInputRef.current.focus();
                  }}
                >
                  <input
                    className={styles.input}
                    type="text"
                    ref={foreignInputRef}
                    value={foreignText}
                    autoFocus
                    onChange={event => setForeignText(event.target.value)}
                  />
                </form>
              </td>
              <td>
                <form
                  onSubmit={event => {
                    event.preventDefault();
                    let newWord = {
                      folderId,
                      wordId: Math.floor(Math.random() * Math.floor(100000000)),
                      foreignWord: foreignText,
                      nativeWord: nativeText
                    };
                    sdk
                      .createNewWord(folderId, newWord)
                      .then(() => onAdd(newWord));
                    setNativeText("");
                    setForeignText("");
                    foreignInputRef.current.focus();
                  }}
                >
                  <input
                    className={styles.input}
                    type="text"
                    ref={nativeInputRef}
                    value={nativeText}
                    onChange={event => setNativeText(event.target.value)}
                  />
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      )}
      {!isClicked && (
        <Button
          buttonClassName={styles.newFolderButtom}
          onClick={() => {
            setIsClicked(!isClicked);
          }}
          value={
            <section className={styles.section}>
              <img src={Plus} alt="Plus" width="15" />
              <span>Add new words pair</span>
            </section>
          }
        />
      )}
    </>
  );
};
