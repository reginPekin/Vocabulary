import React, { useRef } from "react";

import cx from "classnames";

import { useOnClickOutside } from "../../utils/hooks";

import styles from "./Popup.module.css";

export const Popup = ({
  children,
  isVisible,
  changeVisibility = () => null,
  positionClassName = null
}) => {
  const divRef = useRef(null);
  useOnClickOutside(divRef, () => changeVisibility());
  return (
    <div>
      {isVisible && <div className={styles.glass} />}
      {isVisible && (
        <div ref={divRef} className={cx(styles.contextMenu, positionClassName)}>
          {children}
        </div>
      )}
    </div>
  );
};
