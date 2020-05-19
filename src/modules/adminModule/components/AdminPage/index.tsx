import React from "react";
import { useSetDocumentTitle } from "libs/hooks";
import { Container } from "@material-ui/core";
import { Box } from "@material-ui/core";
import AdminBlock from "../AdminBlock";

interface AdminPageInterface {
  settings: any;
}
const AdminPage = ({ settings }: AdminPageInterface) => {
  useSetDocumentTitle(settings.title);

  return (
    <Container>
      {settings.blocks.map((block, index) => (
        <Box key={index} mb={2}>
          <AdminBlock config={block} />
        </Box>
      ))}
    </Container>
  );
};

export default React.memo(AdminPage);
