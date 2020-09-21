import React from "react";
import Layout from "layout";
import RedirectToMainReference from "InitialRedirect";
import { Container } from "typedi";

import BlockRenderer from "modules/screen/BlockRenderer";

import AuthModule from "./index";

import { GlobalState } from "state/globalState";

const globalState = Container.get(GlobalState);

function AuthPage() {
  const { state } = globalState.systemStateContainer;
  return (
    <AuthModule>
      <Layout logo={state.logo} sidebarDataSource={state.sideMenu.dataSource}>
        <BlockRenderer {...state.mainBlock} />
        <RedirectToMainReference />
      </Layout>
    </AuthModule>
  );
}

export default React.memo(AuthPage);
