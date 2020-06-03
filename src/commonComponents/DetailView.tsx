import React from "react";
import { TextField, ListItem, Button } from "@material-ui/core";
import List from "@material-ui/core/List";

import { AdminComponentInterface } from "modules/admin/types";
import { insertContext } from "modules/admin/context";

const fieldsMap = {
  Input: ({ value, title, onChange }: any) => <TextField value={value} title={title} onChange={onChange} />,
  ImageViewer: ({ value, title }: any) => (
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
  context,
  data,
  actions,
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
  return (
    <div>
      <List component="nav">
        {config.fields.map((field: any) => {
          // @ts-ignore
          const render = fieldsMap[field.type];
          if (!render) return null;
          return <ListItem key={field.title}>{render(insertContext(field, context))}</ListItem>;
        })}
      </List>
      <Button
        onClick={() => {
          actions!.update(data);
        }}
      >
        Обновить имя
      </Button>
    </div>
  );
}

export default React.memo(DetailView);
