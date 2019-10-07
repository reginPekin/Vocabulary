import React, { useState } from "react";
import { connect } from "react-redux";

import axios from "axios";

const NewWordContainer = ({ dispatch, vocabulary, folder, word, reset }) => {
  const [text, setText] = useState("");
  // if (folder.words.length > 0) console.log(folder.words[0].nativeWord);
  const folderLength = folder.words.length;

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        reset();

        if (word === "foreign") {
          if (
            folderLength > 0 &&
            folder.words[folderLength - 1].foreignWord === undefined
          ) {
            let newWord = {
              foreignWord: text,
              id: folder.folderId,
              nativeWord: folder.words[folderLength - 1].nativeWord
            };
            console.log(newWord.nativeWord);

            axios.post(
              "http://localhost:4000/vocabulary/addWordToPair",
              newWord
            );
          }
        } else {
          let newWord = {
            foreignWord: text,
            id: folder.folderId
          };
          axios.post("http://localhost:4000/vocabulary/addWord", newWord);
        }
        // } else if (word === "native") {
        //   if (
        //     vocabularyLength > 0 &&
        //     vocabulary[intFolderId].words[vocabularyLength - 1].nativeWord ===
        //       undefined
        //   ) {
        //     dispatch({
        //       type: "ADD_NEW_WORD",
        //       word: word,
        //       nativeWord: text,
        //       folderId: intFolderId,
        //       wordId: vocabularyLength - 1
        //     });
        //   } else {
        //     dispatch({
        //       type: "ADD_NEW_WORD",
        //       word: word,
        //       nativeWord: text,
        //       folderId: intFolderId,
        //       wordId: vocabularyLength
        //     });
        // }
        // }
        setText("");
      }}
    >
      <input
        type="text"
        placeholder="Add word"
        value={text}
        onChange={event => {
          setText(event.target.value);
        }}
      />
    </form>
  );
};

const mapStateProps = state => ({
  vocabulary: state.addNewFolder.vocabulary
});

export const NewWord = connect(mapStateProps)(NewWordContainer);
