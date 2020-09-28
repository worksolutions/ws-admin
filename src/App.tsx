import "reflect-metadata";
import React, { useEffect } from "react";
import { Container } from "typedi";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router";

import Wrapper from "primitives/Wrapper";

import LoadingProvider from "components/LoadingContainer/LoadingProvider";
import Loading from "components/LoadingContainer/Loading";

import { useSetDocumentTitle } from "libs/hooks/special";

import { AuthTokenSaver } from "modules/auth/authTokenSaver";

import { fullHeight, fullWidth } from "./libs/styles";
import TestPage from "./modules/screen/blocks/Test";
import AuthPage from "./modules/auth/AuthPage";
import { convertBytesToHumanReadableFormat } from "./libs/hooks/files/helpers/bytesToHumanReadableFormat";

import { GlobalState } from "state/globalState";

const globalState = Container.get(GlobalState);

function App() {
  useEffect(() => {
    globalState.loadConfig().then(() => {
      const { userAuthenticate } = globalState.systemStateContainer.state;
      if (!userAuthenticate.authTokenSaveStrategy) return;
      new AuthTokenSaver(userAuthenticate.authTokenSaveStrategy).runDefaultTokenPipeline();
    });
  }, []);

  const { state, empty } = globalState.systemStateContainer;

  useSetDocumentTitle(state.title || "Административная панель");

  if (empty) {
    return (
      <LoadingProvider>
        {(ref) => (
          <Wrapper ref={ref} styles={[fullWidth, fullHeight]}>
            <Loading />
          </Wrapper>
        )}
      </LoadingProvider>
    );
  }

  return (
    <LoadingProvider>
      {(ref) => (
        <Wrapper ref={ref} styles={[fullWidth, fullHeight]}>
          <Switch>
            <Route path="/test" component={TestPage} />
            <Route path="/" component={AuthPage} />
          </Switch>
        </Wrapper>
      )}
    </LoadingProvider>
  );
}

export default React.memo(observer(App));
