import "reflect-metadata";
import React, { useEffect } from "react";
import { Route, Switch } from "react-router";
import { Container } from "typedi";
import { observer } from "mobx-react-lite";

import Spinner from "primitives/Spinner";

import { useSetDocumentTitle } from "libs/hooks";

import Screen from "modules/screen";
import ToastReceiver from "modules/ToastReceiver";
import useScreenContextSynchronizer from "modules/context/hooks/useScreenContextSynchronizer";
import AuthModule from "modules/auth";
import { AuthTokenSaver } from "modules/auth/authTokenSaver";

import Layout from "./layout";
import RedirectToMainReference from "./InitialRedirect";

import { SystemState } from "state/systemState";

const systemState = Container.get(SystemState);

function App() {
  useEffect(() => {
    systemState.loadConfig().then(() => {
      const { userAuthenticate } = systemState.stateContainer.state;
      if (!userAuthenticate.authTokenSaveStrategy) return;
      new AuthTokenSaver(userAuthenticate.authTokenSaveStrategy).runDefaultTokenPipeline();
    });
  }, []);
  useSetDocumentTitle(systemState.stateContainer.state.title || "Административная панель");
  useScreenContextSynchronizer();

  if (systemState.stateContainer.empty) {
    return <Spinner size={132} />;
  }

  const state = systemState.stateContainer.state;

  return (
    <>
      <AuthModule>
        <Layout logo={state.logo} sidebarDataSource={state.sideMenu.dataSource}>
          <Switch>
            {state.screens.map((screen) => (
              <Route key={screen.reference} exact path={screen.reference} render={() => <Screen screen={screen} />} />
            ))}
          </Switch>
          <RedirectToMainReference />
        </Layout>
      </AuthModule>
      <ToastReceiver />
    </>
  );
}

export default React.memo(observer(App));
