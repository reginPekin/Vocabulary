import { Switch, Route } from "react-router-dom";
import React from "react";

import { VocabularyWindow } from "../VocabularyWindow";

import style from "./RouteMain.module.css";

export const RouteMain = () => (
  <main className={style.main}>
    <Switch>
      <Route exact path="/" component={VocabularyWindow} />
      <Route path="/:id" render={props => <VocabularyWindow {...props} />} />
    </Switch>
  </main>
);
