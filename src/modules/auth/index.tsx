import React, { ReactNode } from "react";
import { Route, Switch } from "react-router";
import { observer } from "mobx-react-lite";
import { assoc } from "ramda";
import { browserHistory } from "common";
import { Container } from "typedi";

import Spinner from "primitives/Spinner";

import { useEffectSkipFirst } from "libs/hooks";

import { useDataSource } from "modules/context/dataSource/useDataSource";

import AuthView from "./AuthView";
import LogoutView from "./LogoutView";

import { CurrentUserInterface, SystemState } from "state/systemState";

export const systemState = Container.get(SystemState);

function AuthModule({ children }: { children: ReactNode }) {
  const state = systemState.stateContainer.state;

  const { loadingContainer, reload } = useDataSource<{ currentUser: CurrentUserInterface }>(
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
      <Route exact path="/logout" component={LogoutView} />
      {children}
    </Switch>
  );
}

export default React.memo(observer(AuthModule));
