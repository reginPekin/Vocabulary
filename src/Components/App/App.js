import React from "react";
import { Switch, Route } from "react-router-dom";

import styles from "./App.module.css";

import { Menu } from "../Menu";
import { VocabularyWindow } from "../VocabularyWindow";
import { Hello } from "../Hello";

export const App = () => (
  <main className={styles.app}>
    <Menu />
    <section className={styles.main}>
      <Switch>
        <Route exact path="/" component={Hello} />
        <Route path="/:id" render={props => <VocabularyWindow {...props} />} />
      </Switch>
    </section>
  </main>
);
