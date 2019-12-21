import React from "react";

import cx from "classnames";

import styles from "./Button.module.css";

export const Button = ({
  style = null,
  children,
  buttonClassName = null,
  onClick = () => null,
  onDoubleClick = () => null
}) => {
  return (
    <button
      style={style}
      className={cx(styles.button, buttonClassName)}
      onClick={() => onClick()}
      onDoubleClick={() => onDoubleClick()}
    >
      {children}
    </button>
  );
};
