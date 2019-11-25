import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { mount, route } from "navi";

import styles from "./VocabularyWindow.module.css";

import { InfoBox } from "../InfoBox";
import { NewWordsPair } from "../NewWordsPair";
import { PairOfWords } from "../PairOfWords";
import { LanguagesHeader } from "../LanguagesHeader";

import * as sdk from "../../sdk";

const VocabularyWindow = ({ folderRequest }) => {
  const dispatch = useDispatch();
  const [folder, setFolder] = useState(folderRequest);

  useEffect(() => {
    setFolder(folderRequest);
  }, [folderRequest]);

  return (
    <main>
      <InfoBox
        className={styles.InfoBox}
        sortMethod={folder.sortMethod}
        name={folder.name}
        onRename={newName => {
          sdk.renameFolder(folder.id, newName).then(() => {
            setFolder({ ...folder, name: newName });
            dispatch({ type: "SET_HOOK_BEAM" });
          });
        }}
        onSort={speechPart => {
          if (speechPart === "foreignWords")
            sdk.foreignWordSort().then(arr => {
              sdk.sortNext(arr.data, "foreignWords").then(() =>
                sdk.getFolder(folder.id).then(data => {
                  setFolder({ ...folder, words: data.words });
                })
              );
            });
          else if (speechPart === "nativeWords")
            sdk.nativeWordSort().then(arr => {
              sdk.sortNext(arr.data, "nativeWords").then(() =>
                sdk.getFolder(folder.id).then(data => {
                  setFolder({ ...folder, words: data.words });
                })
              );
            });
          else if (speechPart === "speechPart")
            sdk.speechPartSort().then(arr => {
              sdk.sortNext(arr.data, "speechPart").then(() =>
                sdk.getFolder(folder.id).then(data => {
                  setFolder({ ...folder, words: data.words });
                })
              );
            });
          else if (speechPart === "date")
            sdk.dateSort().then(arr => {
              sdk.sortNext(arr.data, "date").then(() =>
                sdk.getFolder(folder.id).then(data => {
                  setFolder({ ...folder, words: data.words });
                })
              );
            });
        }}
      />
      <table className={styles.table}>
        <tbody>
          <LanguagesHeader
            foreignLanguage={folder.foreignLanguage}
            nativeLanguage={folder.nativeLanguage}
            onForeignChange={value =>
              sdk
                .changeLanguage(folder.id, value, "foreign")
                .then(() => setFolder({ ...folder, foreignLanguage: value }))
            }
            onNativeChange={value =>
              sdk
                .changeLanguage(folder.id, value, "native")
                .then(() => setFolder({ ...folder, nativeLanguage: value }))
            }
          />
          {folder.words.map((wordPair, key) => (
            <PairOfWords
              folderId={folder.id}
              wordPair={wordPair}
              key={key}
              onDelete={() => {
                sdk.deleteWordsPair(folder.id, wordPair.wordId).then(() => {
                  const newWords = folder.words.filter(
                    words => words.wordId !== wordPair.wordId
                  );
                  setFolder({ ...folder, words: newWords });
                });
              }}
              onEditWord={(value, language) => {
                const newName = {
                  word: language,
                  wordId: wordPair.wordId,
                  id: folder.id,
                  renamedWord: value
                };
                sdk.editWord(newName).then(() =>
                  setFolder({
                    ...folder,
                    words: folder.words.map(words => {
                      if (words.wordId === wordPair.wordId) {
                        if (language === "foreign") words.foreignWord = value;
                        else if (language === "native")
                          words.nativeWord = value;
                      }
                      return words;
                    })
                  })
                );
              }}
              onEditSpeechPart={value => {
                const newSpeechPart = {
                  id: folder.id,
                  wordId: wordPair.wordId,
                  newSpeechPart: value
                };
                sdk.editSpeechPart(newSpeechPart).then(() =>
                  setFolder({
                    ...folder,
                    words: folder.words.map(words => {
                      if (words.wordId === wordPair.wordId) {
                        words.speechPart = value;
                      }
                      return words;
                    })
                  })
                );
              }}
            />
          ))}

          <NewWordsPair
            folderId={folder.id}
            onAdd={(foreignWord, nativeWord, speechPart) => {
              sdk
                .createNewWord({
                  folderId: folder.id,
                  foreignWord,
                  nativeWord,
                  speechPart
                })
                .then(data => {
                  const newWord = data.data;
                  console.log(newWord);
                  setFolder({ ...folder, words: [...folder.words, newWord] });
                });
            }}
          />
        </tbody>
      </table>
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
