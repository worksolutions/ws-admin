import { Container } from "typedi";
import React from "react";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";

import { AuthTokenSaver } from "./authTokenSaver";

import { GlobalState } from "state/globalState";

export const globalState = Container.get(GlobalState);

function LogoutView() {
  const appContext = useAppContext();

  const { userAuthenticate } = globalState.systemStateContainer.state;
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
