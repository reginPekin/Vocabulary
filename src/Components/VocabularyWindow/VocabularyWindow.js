import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { mount, route } from "navi";

import styles from "./VocabularyWindow.module.css";

import { InfoBox } from "../InfoBox";
import { NewWordsPair } from "../NewWordsPair";
import { PairOfWords } from "../PairOfWords";

import * as sdk from "../../sdk";
import { Button } from "../Button";
import { EditingInput } from "../EditingInput";

const VocabularyWindow = ({ folderRequest }) => {
  const dispatch = useDispatch();
  const [folder, setFolder] = useState(folderRequest);
  const [foreignVisibility, setForeignVisibility] = useState(true);
  const [nativeVisibility, setNativeVisibility] = useState(true);

  const changeForeignVisibility = () =>
    setForeignVisibility(!foreignVisibility);
  const changeNativeVisibility = () => setNativeVisibility(!nativeVisibility);

  useEffect(() => {
    setFolder(folderRequest);
  }, [folderRequest]);

  return (
    <main className={styles.main}>
      <InfoBox
        folder={folder}
        onRename={newName => {
          setFolder({ ...folder, name: newName });
          dispatch({ type: "SET_HOOK_BEAM" });
        }}
      />
      <div>
        <table>
          <tbody>
            <tr className={styles.languages}>
              <td>
                {foreignVisibility && (
                  <Button
                    value={folder.foreignLanguage}
                    onClick={() => changeForeignVisibility()}
                    buttonClassName={styles.buttonClassName}
                  />
                )}
                {!foreignVisibility && (
                  <EditingInput
                    inputClassName={styles.inputClassName}
                    value={folder.foreignLanguage}
                    changeVisibility={() => changeForeignVisibility()}
                    onSubmit={value => {
                      sdk
                        .changeLanguage(folder.id, value, "foreign")
                        .then(() =>
                          setFolder({ ...folder, foreignLanguage: value })
                        );
                    }}
                  />
                )}
              </td>
              <td>
                {nativeVisibility && (
                  <Button
                    value={folder.nativeLanguage}
                    onClick={() => setNativeVisibility(!nativeVisibility)}
                    buttonClassName={styles.buttonClassName}
                  />
                )}
                {!nativeVisibility && (
                  <EditingInput
                    inputClassName={styles.inputClassName}
                    value={folder.nativeLanguage}
                    changeVisibility={() => changeNativeVisibility()}
                    onSubmit={value => {
                      sdk
                        .changeLanguage(folder.id, value, "native")
                        .then(() =>
                          setFolder({ ...folder, nativeLanguage: value })
                        );
                    }}
                  />
                )}
              </td>
            </tr>
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
