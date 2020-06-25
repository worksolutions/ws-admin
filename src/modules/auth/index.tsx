import React from "react";
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

function AuthModule({ children }: { children: JSX.Element }) {
  const state = systemState.stateContainer.state;
  const { data, loadingContainer } = useDataSource<GlobalStateCommonPartInterface>(
    assoc("context", "currentUser", state.user.dataSource!),
  );

  useEffectSkipFirst(() => {
    if (!loadingContainer.hasAnyError()) return;
    browserHistory.replace("/auth");
  }, [loadingContainer.errors]);

  useEffectSkipFirst(() => {
    console.log(data);
  }, [data]);

  if (loadingContainer.loading) return <Spinner color="gray-blue/08" size={36} />;

  return (
    <Switch>
      <Route exact path="/auth" render={() => <AuthView />} />
      {children}
    </Switch>
  );
}

export default React.memo(observer(AuthModule));
