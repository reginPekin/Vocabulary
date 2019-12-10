import React from "react";

import styles from "./NewWordsPairButton.module.css";

import Plus from "../../images/darkPlus.png";

import { Button } from "../Button";

export const NewWordsPairButton = ({ changeVisibility, isOpened }) => {
  if (!isOpened) {
    return (
      <tr>
        <td colSpan={2} className={styles.colSpan}>
          <Button
            buttonClassName={styles.newFolderButtom}
            onClick={() => changeVisibility()}
          >
            <section className={styles.section}>
              <img src={Plus} alt="Plus" width={17} height={17} />
              <span>Add new words pair</span>
            </section>
          </Button>
        </td>
      </tr>
    );
  }

  return null;
};
