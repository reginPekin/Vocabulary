import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { mount, route } from "navi";

import styles from "./VocabularyWindow.module.css";

import { InfoBox } from "../InfoBox";
import { NewWordsPair } from "../NewWordsPair";
import { PairOfWords } from "../PairOfWords";

import * as sdk from "../../sdk";

const VocabularyWindow = ({ folderRequest }) => {
  const dispatch = useDispatch();
  const [folder, setFolder] = useState(folderRequest);

  useEffect(() => {
    setFolder(folderRequest);
  }, [folderRequest]);

  return (
    <main className={styles.main}>
      <InfoBox
        folder={folder}
        buttonClassName={styles.infoBox}
        onRename={newName => {
          setFolder({ ...folder, name: newName });
          dispatch({ type: "SET_HOOK_BEAM" });
        }}
      />
      <div>
        <table>
          <tbody>
            {folder.words.map((wordPair, key) => (
              <PairOfWords
                folderId={folder.id}
                wordPair={wordPair}
                key={key}
                onDelete={wordId => {
                  const newWords = folder.words.filter(
                    words => words.wordId !== wordId
                  );
                  setFolder({ ...folder, words: newWords });
                }}
                onEdit={(wordId, wordLanguage, newName) => {
                  setFolder({
                    ...folder,
                    words: folder.words.map(words => {
                      if (words.wordId === wordId) {
                        if (wordLanguage === "foreign")
                          words.foreignWord = newName;
                        else if (wordLanguage === "native")
                          words.nativeWord = newName;
                      }
                      return words;
                    })
                  });
                }}
              />
            ))}
          </tbody>
        </table>
        <NewWordsPair
          folderId={folder.id}
          onAdd={newWord => {
            setFolder({ ...folder, words: [...folder.words, newWord] });
          }}
        />
      </div>
    </main>
  );
};

export default mount({
  "/:id": route({
    async getView(request) {
      const folder = await sdk.getFolder(request.params.id);
      try {
        return <VocabularyWindow folderRequest={folder} />;
      } catch (error) {
        return <div>F</div>;
      }
    }
  })
});
