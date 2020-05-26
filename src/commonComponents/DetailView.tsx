import React, { useState } from "react";
import { AdminComponentInterface } from "../modules/adminModule/types";
import { TextField, ListItem } from "@material-ui/core";
import List from "@material-ui/core/List";

const fieldsMap = {
  Input: ({ value, title, onChange }) => (
    <TextField value={value} title={title} onChange={onChange} />
  ),
  ImageViewer: ({ value, title }) => (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span>{title}</span>
      <img
        style={{
          maxWidth: 550,
        }}
        src={value}
        alt={title}
      />
    </div>
  ),
};

function DetailView({
  config,
}: AdminComponentInterface & {
  config: {
    fields: {
      title: string;
      type: string;
      config: any;
      value: string;
    }[];
  };
}) {
  const [] = useState();
  return (
    <List component="nav">
      {config.fields.map((field) => {
        const render = fieldsMap[field.type];
        if (!render) return null;
        return <ListItem key={field.title}>{render(field)}</ListItem>;
      })}
    </List>
  );
}

export default React.memo(DetailView);
