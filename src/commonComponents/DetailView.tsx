import React from "react";
import { AdminComponentInterface } from "../modules/adminModule/types";
import { TextField, ListItem } from "@material-ui/core";
import List from "@material-ui/core/List";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

const fieldsMap = {
  Input: ({ value, title }) => <TextField value={value} title={title} />,
  ImageViewer: ({ value, title }) => (
    <Card>
      <CardActionArea>
        <CardMedia
          image={value}
          title={title}
          style={{
            width: 350,
            height: 350,
          }}
        />
      </CardActionArea>
    </Card>
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
