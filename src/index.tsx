import "reflect-metadata";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router";

import { RequestManager } from "libs/request";

import "./style/index.css";
import App from "./App";
import { browserHistory } from "./common";

// import globalEventBus from "./modules/globalEventBus";

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

// let errorHandlerEnabled = false;
//
// globalEventBus.on("SET_REQUEST_MANAGER_ERROR_INTERCEPTOR_ENABLED", (enabled) => {
//   errorHandlerEnabled = enabled;
// });

// RequestManager.beforeErrorMiddleware.push((_config, error) => {
//   if (!errorHandlerEnabled) return;
//   if (error.response?.status === 401) browserHistory.replace("/auth");
// });
