import React from "react";
import { Container } from "typedi";

import { browserHistory } from "./common";
import { GlobalState } from "./state/globalState";

const globalState = Container.get(GlobalState);

function InitialRedirect() {
  const { mainReference } = globalState.systemStateContainer.state;

  React.useEffect(() => {
    if (browserHistory.location.pathname !== "/") return;
    browserHistory.replace(mainReference);
  }, []);

  return null;
}

export default React.memo(InitialRedirect);
