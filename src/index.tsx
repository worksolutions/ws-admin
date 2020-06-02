import "reflect-metadata";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router";
import { createBrowserHistory } from "history";

import App from "./App";

import { RequestManager } from "libs/request";

export const browserHistory = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={browserHistory}>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root"),
);

if (process.env.NODE_ENV === "development") {
  RequestManager.loggerEnabled = true;
}

RequestManager.baseURL = "/api";

RequestManager.beforeSendMiddleware.push((config) => {
  if (!config.headers) config.headers = {};
});

RequestManager.beforeErrorMiddleware.push((_config, error) => {
  if (error.response?.status === 401) browserHistory.replace("/auth");
});
