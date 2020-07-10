import React from "react";
import { Container } from "typedi";

import { browserHistory } from "./common";
import { SystemState } from "./state/systemState";

const systemState = Container.get(SystemState);

function InitialRedirect() {
  const { mainReference } = systemState.stateContainer.state;

  React.useEffect(() => {
    if (browserHistory.location.pathname !== "/") return;
    browserHistory.replace(mainReference);
  }, []);

  return null;
}

export default React.memo(InitialRedirect);
