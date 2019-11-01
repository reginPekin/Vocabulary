import React from "react";

import styles from "./Button.module.css";

export const Button = ({ value, onClick = () => null }) => {
  return (
    <button className={styles.button} onClick={() => onClick()}>
      {value}
    </button>
  );
};
