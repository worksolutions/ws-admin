import React from "react";

import Icon from "primitives/Icon";
import Typography from "primitives/Typography";

import { ai, Aligns, flex, marginRight, verticalPadding } from "libs/styles";

import { CellComponentData } from "../types";

export const cellComponent: CellComponentData = ({ item: { icon, value } }) => {
  const iconElement = icon && <Icon icon="badge" width={8} height={8} color={icon.color} styles={marginRight(8)} />;
  return {
    component: (
      <Typography styles={[verticalPadding(2), flex, ai(Aligns.CENTER)]}>
        {iconElement}
        {value}
      </Typography>
    ),
    cellWidth: "initial",
  };
};
