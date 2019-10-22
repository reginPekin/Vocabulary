import React, { useState, useRef } from "react";

import { addNewWord } from "../../utils/wordUtils";

import * as sdk from "../../sdk";

export const NewWordsPair = ({ folderId, dispatch }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [foreignText, setForeignText] = useState("");
  const [nativeText, setNativeText] = useState("");
  const foreignInputRef = useRef(null);
  const nativeInputRef = useRef(null);

  // const addNewWordPair = () => {
  return (
    <>
      {isClicked && (
        <div>
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
        </div>
      )}
      {!isClicked && (
        <button
          onClick={() => {
            setIsClicked(!isClicked);
          }}
        >
          Add new words
        </button>
      )}
    </>
  );

  // const button = () => {
  //   return (

  // if (isClicked) {
  //   addNewWordPair();
  // } else button();
};
