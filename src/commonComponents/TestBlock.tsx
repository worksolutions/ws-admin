import { AdminComponentInterface } from "../modules/adminModule/types";
import AdminBlock from "../modules/adminModule/components/AdminBlock";
import React from "react";
import Paper from "@material-ui/core/Paper";

function TestBlock({ data, blocks }: AdminComponentInterface) {
  return (
    <Paper elevation={3}>
      {JSON.stringify(data)}
      {blocks.map((block, index) => (
        <AdminBlock key={index} config={block} />
      ))}
    </Paper>
  );
}

export default React.memo(TestBlock);
