import { Vocabulary } from "./Vocabulary";
import { createStore } from "redux";

const InitialStateMethods = {
  array: Vocabulary
};

const showPage = (state = InitialStateMethods) => {
  return state;
};

export const store = createStore(
  showPage,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
