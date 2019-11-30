import { combineReducers } from "redux";

import searchTextChanger from "./searchTextChanger";
import hookBeamReducer from "./hookBeamReducer";
import { sortTypeReducer, sortDirectionReducer } from "./sortTypeReducer";

const rootReducer = combineReducers({
  searchTextChanger,
  hookBeamReducer,
  sortTypeReducer,
  sortDirectionReducer
});

export default rootReducer;
