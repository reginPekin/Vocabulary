import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

import rootReducer from "../reducers/index";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["sortTypeReducer", "sortDirectionReducer"],
  blacklist: ["searchTextChanger", "hookBeamReducer"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
