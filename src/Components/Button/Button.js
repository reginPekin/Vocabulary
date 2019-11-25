import React from "react";

import cx from "classnames";

import styles from "./Button.module.css";

export const Button = ({
  style = null,
  children,
  onClick = () => null,
  buttonClassName = null
}) => {
  return (
    <button
      style={style}
      className={cx(styles.button, buttonClassName)}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};
