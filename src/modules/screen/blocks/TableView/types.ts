import { HeaderGroup, UseResizeColumnsColumnProps } from "react-table";

export enum TableViewDataType {
  NUMBER = "NUMBER",
  STRING = "STRING",
  DATE = "DATE",
}

export enum TableSortingType {
  ASC = "ASC",
  DESC = "DESC",
}

export interface TableViewDataSource {
  selectable: boolean;
  columns: ({ title: string; field: string; type?: TableViewDataType; sortable?: boolean } & TableViewSizes)[];
  data: ({ id: string | number; reference?: string } & Record<
    string,
    string | number | { reference: string; value: string | number }
  >)[];
}

export type HeaderGroupInterface = { headers: (UseResizeColumnsColumnProps<any> & HeaderGroup<any>)[] } & HeaderGroup<
  any
>;

interface TableViewSizes {
  minWidth?: number;
  width?: number;
  maxWidth?: number;
}

export interface TableViewOptionsInterface {
  tableViewDefaultSizes?: TableViewSizes;
}
