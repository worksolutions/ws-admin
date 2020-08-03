import React from "react";

import { TableViewColumn, TableViewItemInterface } from "../../types";

export type CellComponentData = (props: {
  item: TableViewItemInterface;
  linkWrapper?: (child: React.ReactNode, styles?: any) => JSX.Element;
  column: TableViewColumn;
}) => { cellWidth: number | string; component: JSX.Element };
