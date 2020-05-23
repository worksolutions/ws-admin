import React from "react";
import { StoreContext } from "light-state-manager";

import { useSetDocumentTitle } from "libs/hooks";
import { Container } from "@material-ui/core";
import { Box } from "@material-ui/core";

import AdminBlock from "../AdminBlock";

import pageState from "state/page/state";

import pageContextHOC from "../../HOC/Context/pageContextHOC";

interface AdminPageInterface {
  settings: any;
  context: any;
}
const AdminPage = ({ settings }: AdminPageInterface) => {
  useSetDocumentTitle(settings.title);

  return (
    <Container>
      {settings.blocks.map((block, index) => (
        <Box key={index} mb={2}>
          <AdminBlock props={block} />
        </Box>
      ))}
    </Container>
  );
};

const PageWithContext = StoreContext.connectContexts(
  [pageState],
  pageContextHOC(AdminPage),
);

export default React.memo(PageWithContext);
