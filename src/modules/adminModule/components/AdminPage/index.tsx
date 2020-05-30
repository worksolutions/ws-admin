import React from "react";

import { useSetDocumentTitle } from "libs/hooks";
import { Container } from "@material-ui/core";

import AdminBlock from "../AdminBlock";

import pageContextHOC from "../../HOC/Context/pageContextHOC";
import { RouteComponentProps, withRouter } from "react-router";

interface AdminPageInterface {
  settings: any;
  context: any;
}
const AdminPage = ({ settings }: AdminPageInterface & RouteComponentProps) => {
  useSetDocumentTitle(settings.title);

  return (
    <Container>
      {settings.blocks.map((block, index) => (
        <AdminBlock key={index} config={block} />
      ))}
    </Container>
  );
};

const PageWithContext = pageContextHOC(AdminPage);
export default React.memo(withRouter(PageWithContext));
