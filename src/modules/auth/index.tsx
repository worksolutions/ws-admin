import React, { ReactNode } from "react";
import { Route, Switch } from "react-router";
import { Container } from "typedi";
import { observer } from "mobx-react-lite";
import { assoc } from "ramda";
import { browserHistory } from "common";

import Spinner from "primitives/Spinner";

import { useEffectSkipFirst } from "libs/hooks";

import { useDataSource } from "modules/context/dataSource/useDataSource";
import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";

import AuthView from "./AuthView";
import { AuthTokenSaver } from "./authTokenSaver";

import { SystemState } from "state/systemState";
import { GlobalStateCommonPartInterface } from "state/globalState";

const systemState = Container.get(SystemState);

function Logout() {
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

  return <></>;
}

function AuthModule({ children }: { children: ReactNode }) {
  const state = systemState.stateContainer.state;

  const { loadingContainer, reload } = useDataSource<GlobalStateCommonPartInterface>(
    assoc("context", "currentUser", state.userAuthenticate.dataSource!),
  );

  useEffectSkipFirst(() => {
    if (loadingContainer.hasAnyError()) {
      browserHistory.replace("/auth");
    }
  }, [loadingContainer.errors]);

  if (loadingContainer.loading) return <Spinner size={36} />;

  return (
    <Switch>
      <Route exact path="/auth" render={() => <AuthView reloadProfile={reload} />} />
      <Route exact path="/logout" render={() => <Logout />} />
      {children}
    </Switch>
  );
}

export default React.memo(observer(AuthModule));
