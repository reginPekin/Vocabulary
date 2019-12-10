import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { mount, route } from "navi";

import styles from "./VocabularyWindow.module.css";

import { InfoBox } from "../InfoBox";
import { NewWordsPairButton } from "../NewWordsPairButton";
import { PairOfWords } from "../PairOfWords";
import { LanguagesHeader } from "../LanguagesHeader";
import { NewWordsPair } from "../NewWordsPair";

import {
  setSortType,
  setHookBeam,
  setSortDirection
} from "../../utils/smallActions";

import * as sdk from "../../sdk";

const VocabularyWindow = ({ folderRequest, sortDirection, sortType }) => {
  const dispatch = useDispatch();
  const [folder, setFolder] = useState(folderRequest);
  const [isOpened, setIsOpened] = useState(false);

  const changeVisibilityPopup = () => {
    setIsOpened(!isOpened);
  };

  useEffect(() => {
    setFolder(folderRequest);
  }, [folderRequest]);

  return (
    <main className={styles.vocabularyWindow}>
      <InfoBox
        sortDirection={sortDirection}
        sortMethod={sortType}
        className={styles.InfoBox}
        name={folder.name}
        onRename={newName => {
          sdk.renameFolder(folder.id, newName).then(() => {
            setFolder({ ...folder, name: newName });
            dispatch(setHookBeam());
          });
        }}
        onSort={(sortType, sortDirection) => {
          sdk.getWordsArray(folder.id, sortType, sortDirection).then(data => {
            setFolder({ ...folder, words: data.words });
            dispatch(setSortType(sortType));
          });
        }}
        onClick={() => {
          dispatch(setSortDirection());
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

          <NewWordsPairButton
            isOpened={isOpened}
            changeVisibility={changeVisibilityPopup}
          />
        </tbody>
      </table>
      <NewWordsPair
        isOpened={isOpened}
        changeVisibility={changeVisibilityPopup}
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
              setFolder({ ...folder, words: [...folder.words, newWord] });
            });
        }}
      />
    </main>
  );
};

export default mount({
  "/:id": route({
    async getView(request, context) {
      try {
        const folder = await sdk.getWordsArray(
          request.params.id,
          context.sortType,
          context.sortDirection
        );

        return (
          <VocabularyWindow
            folderRequest={folder}
            sortType={context.sortType}
            sortDirection={context.sortDirection}
          />
        );
      } catch (error) {
        return <div>F</div>;
      }
    }
  })
});
