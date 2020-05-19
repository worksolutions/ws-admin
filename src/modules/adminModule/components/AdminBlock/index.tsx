import React from "react";
import { Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

interface AdminBlockInterface {
  config: any;
}
const AdminBlock = ({ config }: AdminBlockInterface) => {
  return (
    <Container>
      <Paper elevation={3}>{JSON.stringify(config)}</Paper>
    </Container>
  );
};

export default React.memo(AdminBlock);
