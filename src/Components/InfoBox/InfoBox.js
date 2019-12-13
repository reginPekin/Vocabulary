import React, { useState, useRef } from "react";
import Select from "react-select";
import { connect } from "react-redux";

import styles from "./InfoBox.module.css";

import { InputButton } from "../InputButton";
import { Button } from "../Button";
import { Popup } from "../Popup";

import { RepeatIcon, SearchIcon } from "../Icons";

import { setSearchText } from "../../utils/smallActions";

export const InfoBoxContainer = ({
  onRename,
  name,
  onSort,
  sortMethod,
  onClick,
  sortDirection,
  searchText,
  dispatch
}) => {
  const [visibility, setVisibility] = useState(true);
  const [popupVisibility, setPopupVisibility] = useState(false);
  const changeVisibility = () => setVisibility(!visibility);
  const changePopupVisibility = () => setPopupVisibility(!popupVisibility);
  const selectRef = useRef(null);
  let defaultValue = "";
  switch (sortMethod) {
    case "date":
      defaultValue = "Date";
      break;
    case "foreign":
      defaultValue = "Foreign words";
      break;
    case "native":
      defaultValue = "Native words";
      break;
    case "speech":
      defaultValue = "Speech parts";
      break;
    default:
      console.log("none");
  }

  const Voc = [
    "one",
    "two",
    "three",
    "sdfsd",
    "cxmv",
    "dsfl",
    "lcm",
    "dvkci",
    "tiro",
    "pogpf",
    "gbklc"
  ];

  const options = [
    { value: "date", label: "Date" },
    { value: "foreign", label: "Foreign words" },
    { value: "native", label: "Native words" },
    { value: "speech", label: "Speech parts" }
  ];
  return (
    <div className={styles.infoBox}>
      <Popup
        positionClassName={styles.popup}
        isVisible={popupVisibility}
        changeVisibility={changePopupVisibility}
      >
        <form
          className={styles.popupForm}
          onSubmit={event => {
            dispatch(setSearchText(""));
            event.preventDefault();
          }}
        >
          <input
            className={styles.popupInput}
            onChange={event => {
              dispatch(setSearchText(event.target.value));
              console.log(searchText);
            }}
            autoFocus
            value={searchText}
          />
          {/* eslint-disable-next-line array-callback-return */}
          {Voc.map((word, key) => {
            if (
              searchText !== "" &&
              word.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
            ) {
              return (
                <div key={key} className={styles.searchedWord}>
                  {word}
                </div>
              );
            }
          })}
        </form>
      </Popup>
      <InputButton
        visibility={visibility}
        changeVisibility={() => changeVisibility()}
        onChange={value => onRename(value)}
        text={name}
        inputClassName={styles.inputClassName}
        formClassName={styles.formClassName}
        buttonClassName={styles.buttonClassName}
      />

      <label className={styles.sort}>
        Sort by:
        <Select
          ref={selectRef}
          className={styles.sortSelect}
          options={options}
          onChange={event => {
            onSort(event.value, sortDirection);
          }}
          defaultValue={{ label: defaultValue, value: sortMethod }}
        />
        <Button
          onClick={() => {
            onClick();
            onSort(selectRef.current.state.value.value, sortDirection);
          }}
        >
          <RepeatIcon style={{ transform: "rotate(90deg)" }} />
        </Button>
        <Button onClick={() => changePopupVisibility()}>
          <SearchIcon />
        </Button>
      </label>
    </div>
  );
};

const mapStateProps = state => ({
  searchText: state.searchTextChanger.searchText
});

export const InfoBox = connect(mapStateProps)(InfoBoxContainer);
