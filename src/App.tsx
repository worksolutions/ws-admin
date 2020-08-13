import "reflect-metadata";
import React, { useEffect } from "react";
import { Container } from "typedi";
import { observer } from "mobx-react-lite";

import Spinner from "primitives/Spinner";
import { TypographyGlobalStyle } from "primitives/Typography";

import { useSetDocumentTitle } from "libs/hooks/special";

import ToastReceiver from "modules/ToastReceiver";
import AuthModule from "modules/auth";
import { AuthTokenSaver } from "modules/auth/authTokenSaver";
import BlockRenderer from "modules/screen/BlockRenderer";

import Layout from "./layout";
import RedirectToMainReference from "./InitialRedirect";

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
    return <Spinner size={132} />;
  }

  return (
    <>
      <AuthModule>
        <Layout logo={state.logo} sidebarDataSource={state.sideMenu.dataSource}>
          <BlockRenderer {...state.mainBlock} />
          <RedirectToMainReference />
        </Layout>
      </AuthModule>
      <ToastReceiver />
      <TypographyGlobalStyle />
    </>
  );
}

export default React.memo(observer(App));
