import React from "react";

import cx from "classnames";

import styles from "./Button.module.css";

export const Button = ({
  value,
  onClick = () => null,
  buttonClassName = null
}) => {
  return (
    <button
      className={cx(styles.button, buttonClassName)}
      onClick={() => onClick()}
    >
      {value}
    </button>
  );
};
