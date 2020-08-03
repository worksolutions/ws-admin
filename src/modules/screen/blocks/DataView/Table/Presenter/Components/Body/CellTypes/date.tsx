import React from "react";

import { CellComponentData } from "../types";
import { cellDefaultHorizontalPadding } from "../../../libs/paddings";

import { cellComponent as stringCellComponent } from "./string";

const cellWidth = 110 + cellDefaultHorizontalPadding;

export const cellComponent: CellComponentData = (props) => {
  return {
    component: stringCellComponent(props).component,
    cellWidth,
  };
};
