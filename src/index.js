import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux";
import { BrowserRouter } from "react-router-dom";

import "./style/index.css";

import { App } from "./Components/app";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
