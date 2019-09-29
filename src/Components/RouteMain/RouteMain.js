import { Switch, Route } from "react-router-dom";
import React from "react";

import { VocabularyWindow } from "../VocabularyWindow";
import { Hello } from "../Hello";

import style from "./RouteMain.module.css";

export const RouteMain = () => {
  return (
    <main className={style.main}>
      <Switch>
        <Route exact path="/" component={Hello} />
        <Route path="/:id" render={props => <VocabularyWindow {...props} />} />
      </Switch>
    </main>
  );
};
