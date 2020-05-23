import React from "react";
import { StoreContext } from "light-state-manager";

import { useSetDocumentTitle } from "libs/hooks";
import { Container } from "@material-ui/core";

import AdminBlock from "../AdminBlock";

import pageState from "state/page/state";

import pageContextHOC from "../../HOC/Context/pageContextHOC";

interface AdminPageInterface {
  settings: any;
  context: any;
}
const AdminPage = React.memo(({ settings }: AdminPageInterface) => {
  useSetDocumentTitle(settings.title);
  const state = pageState.getState();

  return (
    <Container>
      {settings.blocks.map((block, index) => (
        <AdminBlock key={index} props={block} context={state} />
      ))}
    </Container>
  );
});

const PageWithContext = StoreContext.connectContexts(
  [pageState],
  pageContextHOC(AdminPage),
);

export default React.memo(PageWithContext);
