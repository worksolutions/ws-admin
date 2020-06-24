import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Container } from "@material-ui/core";

import { useSetDocumentTitle } from "libs/hooks";

import AdminBlock from "../AdminBlock";
import screenContextHOC from "../../HOC/Context/screenContextHOC";

interface AdminPageInterface {
  settings: any;
  context: any;
}

const AdminPage = ({ settings }: AdminPageInterface & RouteComponentProps) => {
  useSetDocumentTitle(settings.title);

  return (
    <Container>
      {settings.blocks.map((block: any, index: number) => (
        <AdminBlock key={index} config={block} />
      ))}
    </Container>
  );
};

export default React.memo(withRouter(screenContextHOC(AdminPage)));
