import "reflect-metadata";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router";
import "mobx-react-lite/batchingForReactDom";
import "style/index.css";

import { TypographyGlobalStyle } from "primitives/Typography";

import "libs/date";
import { RequestManager } from "libs/request";

import ToastReceiver from "modules/ToastReceiver";

import App from "../modules/App";
import { browserHistory } from "../common";

import configurator from "./Configurator";

ReactDOM.render(
  <Router history={browserHistory}>
    <>
      <App />
      <ToastReceiver />
      <TypographyGlobalStyle />
    </>
  </Router>,
  document.getElementById("root"),
);

if (process.env.NODE_ENV === "development") {
  RequestManager.loggerEnabled = true;
}

RequestManager.baseURL = (process.env.PUBLIC_URL || "") + "/api";

export default configurator;
