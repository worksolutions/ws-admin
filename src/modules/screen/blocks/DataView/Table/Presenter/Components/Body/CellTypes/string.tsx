import React from "react";

import Typography from "primitives/Typography";
import { TypographyLink } from "primitives/Typography/TypographyLink";

import { overflow, verticalPadding } from "libs/styles";
import { isPureObject } from "libs/is";

import { CellComponentData } from "../types";
import { TableViewItemInterface } from "../../../types";

const typographyStyles = [overflow("hidden"), verticalPadding(2)];

function textComponent(item: TableViewItemInterface) {
  if (!isPureObject(item)) return <Typography styles={[typographyStyles, item.styles]}>{item}</Typography>;
  if (item.redirectReference)
    return (
      <TypographyLink styles={[typographyStyles, item.styles]} to={item.redirectReference}>
        {item.value}
      </TypographyLink>
    );
  return <Typography styles={[typographyStyles, item.styles]}>{item.value}</Typography>;
}

export const cellComponent: CellComponentData = ({ item }) => {
  return {
    component: textComponent(item),
    cellWidth: "initial",
  };
};
