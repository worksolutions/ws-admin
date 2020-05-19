import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import CssBaseline from "@material-ui/core/CssBaseline";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";
import { createBrowserHistory } from "history";

import { StoreContext } from "./state/store";
import systemState from "state/system/state";
import { Router } from "react-router";

const AppWithContext = StoreContext.connectContexts(
  [[systemState, "system"]],
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
