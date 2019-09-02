import { Switch, Route } from "react-router-dom";
import React from "react";

import { VocabularyWindow } from "../VocabularyWindow";
// import { VocabularyTable } from "../VocabularyTable";

export const RouteMain = () => (
  <main>
    <Switch>
      <Route exact path="/" component={VocabularyWindow} />
      <Route path="/:id" render={props => <VocabularyWindow {...props} />} />
    </Switch>
  </main>
);
