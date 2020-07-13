import React, { ReactNode } from "react";
import { Route, Switch } from "react-router";
import { Container } from "typedi";
import { observer } from "mobx-react-lite";
import { assoc } from "ramda";

import Spinner from "primitives/Spinner";

import { useEffectSkipFirst } from "libs/hooks";

import { useDataSource } from "../context/dataSource/useDataSource";
import { browserHistory } from "../../common";

import AuthView from "./AuthView";

import { SystemState } from "state/systemState";
import { GlobalStateCommonPartInterface } from "state/globalState";

const systemState = Container.get(SystemState);

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
      {children}
    </Switch>
  );
}

export default React.memo(observer(AuthModule));
