import React, { useRef } from "react";
import Select from "react-select";
import cx from "classnames";

import styles from "./NewWordsPair.module.css";

import { dropInputRefValues } from "../../utils";
import { useOnClickOutside } from "../../utils/hooks";

export const NewWordsPair = ({
  onAdd,
  isOpened,
  changeVisibility = () => null
}) => {
  const foreignInputRef = useRef(null);
  const nativeInputRef = useRef(null);
  const speechPartRef = useRef(null);
  // const datalistRef = useRef(null);
  const formRef = useRef(null);

  // console.log(datalistRef);

  useOnClickOutside(formRef, () => {
    changeVisibility();
    dropInputRefValues(foreignInputRef, nativeInputRef);
  });

  const options = [
    { value: "noun", label: "noun" },
    { value: "adjective", label: "adjective", color: "#00B8D9" },
    { value: "verb", label: "verb" },
    { value: "adverb", label: "adverb" },
    { value: "pronoun", label: "pronoun" },
    { value: "preposition", label: "preposition" },
    { value: "conjuction", label: "conjuction" },
    { value: "interjection", label: "interjection" }
  ];

  if (isOpened) {
    return (
      <div ref={formRef} className={styles.newWordsPair}>
        <section className={styles.words}>
          <form
            onSubmit={event => {
              event.preventDefault();
              nativeInputRef.current.focus();
            }}
          >
            <input
              placeholder="Foreign word"
              className={styles.inputWords}
              ref={foreignInputRef}
              autoFocus
            />
          </form>
          <form
            onSubmit={event => {
              event.preventDefault();
              speechPartRef.current.focus();
              // datalistRef.current.focus();
            }}
          >
            <input
              placeholder="Native word"
              className={styles.inputWords}
              ref={nativeInputRef}
            />
          </form>
        </section>
        <section className={styles.additionInfo}>
          <form
            className={styles.form}
            onSubmit={event => {
              event.preventDefault();
              if (
                !foreignInputRef.current ||
                !nativeInputRef.current ||
                !speechPartRef.current
              ) {
                return;
              }
              onAdd(
                foreignInputRef.current.value,
                nativeInputRef.current.value,
                speechPartRef.current.value
              );
              dropInputRefValues(
                foreignInputRef,
                nativeInputRef,
                speechPartRef
              );
              foreignInputRef.current.focus();
            }}
          >
            <Select
              options={options}
              className={cx(styles.select)}
              isSearchable
              ref={speechPartRef}
            />
            {/* <input
              list="browsers"
              name="browser"
              placeholder="The part of speech"
              ref={speechPartRef}
            />
            

             <datalist id="browsers" ref={datalistRef}>
              <option value="noun" />
              <option value="adjective" />
              <option value="verb" />
              <option value="adverb" />
              <option value="pronoun" />
              <option value="preposition" />
              <option value="conjuction" />
              <option value="interjection" />
            </datalist> */}
          </form>
        </section>
      </div>
    );
  }
  return null;
};
