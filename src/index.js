import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux2";
import { Router, View } from "react-navi";
import { routes } from "./routes";

import "./style/index.css";
import styles from "./style/index.module.css";

import { Menu } from "./components/Menu";

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes}>
      <main className={styles.app}>
        <Menu />
        <Suspense fallback={null}>
          <section className={styles.main}>
            <View />
          </section>
        </Suspense>
      </main>
    </Router>
  </Provider>,
  document.getElementById("root")
);
