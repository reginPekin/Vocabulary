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
    <main className={styles.main}>
      <InfoBox
        name={folder.name}
        onRename={newName => {
          sdk.renameFolder(folder.id, newName).then(() => {
            setFolder({ ...folder, name: newName });
            dispatch({ type: "SET_HOOK_BEAM" });
          });
        }}
      />
      <div>
        <table>
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
                onEdit={(value, language) => {
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
              />
            ))}
          </tbody>
        </table>
        <NewWordsPair
          folderId={folder.id}
          onAdd={(foreignValue, nativeValue) => {
            sdk
              .createNewWord({
                folderId: folder.id,
                foreignWord: foreignValue,
                nativeWord: nativeValue
              })
              .then(data => {
                const newWord = data.data;
                setFolder({ ...folder, words: [...folder.words, newWord] });
              });
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
