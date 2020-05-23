import { AdminComponentInterface } from "../modules/adminModule/types";
import AdminBlock from "../modules/adminModule/components/AdminBlock";
import React from "react";
import Paper from "@material-ui/core/Paper";

function TestBlock(props: AdminComponentInterface) {
  const { data } = props;
  return (
    <Paper elevation={3}>
      {JSON.stringify(data)}
      {props.blocks.map((block, index) => (
        <AdminBlock key={index} context={props.context} props={block} />
      ))}
    </Paper>
  );
}

export default React.memo(TestBlock);
