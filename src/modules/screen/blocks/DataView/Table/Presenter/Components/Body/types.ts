import { TableViewColumn, TableViewItemInterface } from "../../types";

export type CellComponentData = (props: {
  item: TableViewItemInterface;
  column: TableViewColumn;
}) => { cellWidth: number | string; component: JSX.Element; shiftByY?: number };
