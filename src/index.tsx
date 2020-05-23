import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router";
import { StoreContext } from "light-state-manager";

import CssBaseline from "@material-ui/core/CssBaseline";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";
import { createBrowserHistory } from "history";

import App from "./App";
import systemState from "state/system/state";
import globalState from "state/global/state";

const AppWithContext = StoreContext.connectContexts(
  [systemState, globalState],
  App,
);

export const browserHistory = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <ScopedCssBaseline>
      <CssBaseline />
      <Router history={browserHistory}>
        <AppWithContext />
      </Router>
    </ScopedCssBaseline>
  </React.StrictMode>,
  document.getElementById("root"),
);
