import React from "react";

import styles from "./App.module.css";

import { FolderWindow } from "../FolderWindow";
import { RouteMain } from "../RouteMain";

export const App = () => {
  return (
    <div className={styles.app}>
      <FolderWindow />
      <RouteMain />
    </div>
  );
};
