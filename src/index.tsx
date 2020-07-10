import "reflect-metadata";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router";

import { RequestManager } from "libs/request";

import "./style/index.css";
import App from "./App";
import { browserHistory } from "./common";

ReactDOM.render(
  <Router history={browserHistory}>
    <App />
  </Router>,
  document.getElementById("root"),
);

if (process.env.NODE_ENV === "development") {
  RequestManager.loggerEnabled = true;
}

RequestManager.baseURL = "/api";

RequestManager.beforeSendMiddleware.push((config) => {
  if (!config.headers) config.headers = {};
});
