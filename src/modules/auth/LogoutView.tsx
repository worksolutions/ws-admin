import { Container } from "typedi";
import React from "react";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";

import { AuthTokenSaver } from "./authTokenSaver";

import { SystemState } from "state/systemState";

export const systemState = Container.get(SystemState);

function LogoutView() {
  const appContext = useAppContext();

  const { userAuthenticate } = systemState.stateContainer.state;
  const { logout } = useActions(userAuthenticate.actions, appContext);

  async function removeToken() {
    await logout.run();
    if (userAuthenticate.authTokenSaveStrategy) {
      new AuthTokenSaver(userAuthenticate.authTokenSaveStrategy).runRemoveTokenPipeline();
    }
  }

  React.useEffect(() => {
    removeToken();
  }, []);

  return null;
}

export default React.memo(LogoutView);
