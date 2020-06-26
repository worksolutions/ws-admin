import "reflect-metadata";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router";
import { Container } from "typedi";
import Cookie from "js-cookie";

import { RequestManager } from "libs/request";

import "./style/index.css";
import App from "./App";
import { browserHistory } from "./common";

import { SystemState } from "state/systemState";

const systemState = Container.get(SystemState);

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

  const { userAuthenticate } = systemState.stateContainer.state;
  if (!userAuthenticate) return;

  const { setTokenCookieFromFrontend } = userAuthenticate;
  if (!setTokenCookieFromFrontend) return;
  if (!setTokenCookieFromFrontend.headerName) return;

  config.headers[setTokenCookieFromFrontend.headerName] = Cookie.get(setTokenCookieFromFrontend.cookieName);
});
