import React, { useState, useRef } from "react";

import { addNewWord } from "../../utils/wordUtils";

import * as sdk from "../../sdk";

export const NewWordsPair = ({ folderId, dispatch }) => {
  const [foreignText, setForeignText] = useState("");
  const [nativeText, setNativeText] = useState("");
  const foreignInputRef = useRef(null);
  const nativeInputRef = useRef(null);
  return (
    <tr>
      <td>
        <form
          onSubmit={event => {
            event.preventDefault();
            nativeInputRef.current.focus();
          }}
        >
          <input
            type="text"
            ref={foreignInputRef}
            value={foreignText}
            onChange={event => setForeignText(event.target.value)}
          />
        </form>
      </td>
      <td>
        <form
          onSubmit={event => {
            let newWord = {
              folderId,
              wordId: Math.floor(Math.random() * Math.floor(100000000)),
              foreignWord: foreignText,
              nativeWord: nativeText
            };
            sdk.createNewWord(folderId, newWord);
            dispatch(addNewWord(newWord));
            setNativeText("");
            setForeignText("");
            foreignInputRef.current.focus();
            event.preventDefault();
          }}
        >
          <input
            type="text"
            ref={nativeInputRef}
            value={nativeText}
            onChange={event => setNativeText(event.target.value)}
          />
        </form>
      </td>
    </tr>
  );
};
