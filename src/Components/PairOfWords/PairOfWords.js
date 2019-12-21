import React, { useState, useRef, useEffect } from "react";

import styles from "./PairOfWords.module.css";
import { activeStyle, clickedStyle } from "../../utils/index";
import { useOnClickOutside } from "../../utils/hooks";

export const PairOfWords = ({
  activeWordsPairId,
  onClick,
  wordPair,
  emptyState = () => null,
  onDoubleClick = () => null,
  isContextOpen
}) => {
  const tableRef = useRef(null);

  useOnClickOutside(tableRef, () => {
    if (!activeWordsPairId === wordPair.wordId) {
      return;
    }

    emptyState();
  });

  return (
    <>
      <tr
        className={styles.trOfWords}
        style={activeStyle(activeWordsPairId, wordPair.wordId)}
        ref={tableRef}
        onClick={() => !isContextOpen && onClick()}
        onDoubleClick={() => onDoubleClick()}
      >
        <td
          style={clickedStyle(
            activeWordsPairId,
            wordPair.wordId,
            "tdFirst",
            isContextOpen
          )}
        >
          {wordPair.foreignWord}
        </td>
        <td
          style={clickedStyle(
            activeWordsPairId,
            wordPair.wordId,
            "tdSecond",
            isContextOpen
          )}
        >
          {wordPair.nativeWord}
        </td>
      </tr>
      <tr
        style={
          isContextOpen
            ? {
                fontSize: "1em",
                height: "50px",
                transition:
                  "height 0.2s ease-out 0s, color 0.1s linear 0s, font-size 0s linear 0.1s"
              }
            : {
                fontSize: "0",
                color: "rgba(0, 0, 0, 0)",
                height: "0",
                transition:
                  "height 0.2s ease-out 0s, color 0.1s linear 0s, font-size 0s linear 0.1s"
              }
        }
      >
        <td colSpan="2" className={styles.additionTd}>
          <span>The part of speech: {wordPair.speechPart}</span>
        </td>
      </tr>
    </>
  );
};
