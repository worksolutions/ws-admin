import React, { ReactNode } from "react";
import { Route, Switch } from "react-router";
import { observer } from "mobx-react-lite";
import { assoc } from "ramda";
import { browserHistory } from "common";
import { Container } from "typedi";

import Loading from "components/LoadingContainer/Loading";

import { useEffectSkipFirst } from "libs/hooks/common";

import { useDataSource } from "modules/context/dataSource/useDataSource";

import AuthView from "./AuthView";
import LogoutView from "./LogoutView";

import { GlobalState, UserInterface } from "state/globalState";

export const globalState = Container.get(GlobalState);

function AuthModule({ children }: { children: ReactNode }) {
  const state = globalState.systemStateContainer.state;

  const { loadingContainer, reload } = useDataSource<{ currentUser: UserInterface }>(
    assoc("context", "currentUser", state.userAuthenticate.dataSource!),
  );

  useEffectSkipFirst(() => {
    if (loadingContainer.hasAnyError()) {
      browserHistory.replace("/auth");
    }
  }, [loadingContainer.errors]);

  if (loadingContainer.loading) return <Loading />;

  return (
    <Switch>
      <Route exact path="/auth" render={() => <AuthView reloadProfile={reload} />} />
      <Route exact path="/logout" component={LogoutView} />
      {children}
    </Switch>
  );
}

export default React.memo(observer(AuthModule));
