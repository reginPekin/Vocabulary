import { Vocabulary } from "./Vocabulary";

import { createStore } from "redux";

const InitialStateVocabulary = {
  array: Vocabulary
};

const showPage = (state = InitialStateVocabulary, action) => {
  switch (action.type) {
    case "show":
      return state;

    default:
      return state;
  }
};

export const store = createStore(showPage);
