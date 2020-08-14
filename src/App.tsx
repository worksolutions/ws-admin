import "reflect-metadata";
import React, { useEffect } from "react";
import { Container } from "typedi";
import { observer } from "mobx-react-lite";

import { TypographyGlobalStyle } from "primitives/Typography";

import LoadingProvider from "components/LoadingContainer/LoadingProvider";
import Loading from "components/LoadingContainer/Loading";

import { useSetDocumentTitle } from "libs/hooks/special";

import ToastReceiver from "modules/ToastReceiver";
import AuthModule from "modules/auth";
import { AuthTokenSaver } from "modules/auth/authTokenSaver";
import BlockRenderer from "modules/screen/BlockRenderer";

import Layout from "./layout";
import RedirectToMainReference from "./InitialRedirect";
import Wrapper from "./primitives/Wrapper";
import { fullHeight, fullWidth } from "./libs/styles";

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
          <AuthModule>
            <Layout logo={state.logo} sidebarDataSource={state.sideMenu.dataSource}>
              <BlockRenderer {...state.mainBlock} />
              <RedirectToMainReference />
            </Layout>
          </AuthModule>
          <ToastReceiver />
          <TypographyGlobalStyle />
        </Wrapper>
      )}
    </LoadingProvider>
  );
}

export default React.memo(observer(App));
