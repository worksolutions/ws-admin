import { TableViewColumn, TableViewItemInterface } from "../../types";

export type CellComponentData = (props: {
  item: TableViewItemInterface;
  column: TableViewColumn;
  index: number;
}) => { cellWidth: number | string; component: JSX.Element };
