import React from "react";
import { mount, lazy, route } from "navi";
import { Hello } from "./components/Hello";

export const routes = mount({
  "/": route({
    title: "Meee",
    view: <Hello />
  }),
  "/voc": lazy(() => import("./components/VocabularyWindow/VocabularyWindow"))
});

// <Route exact path="/" component={Hello} />
// <Route path="/:id" render={props => <VocabularyWindow {...props} />} />
