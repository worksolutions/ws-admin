export enum TableViewDataType {
  NUMBER = "NUMBER",
  STRING = "STRING",
  DATE = "DATE",
}

export enum TableSortingType {
  ASC = "ASC",
  DESC = "DESC",
}

interface TableViewSizes {
  minWidth?: number;
  width?: number;
  maxWidth?: number;
}

export interface TableViewDataSource {
  tableViewDefaultSizes?: TableViewSizes;
  selectable: boolean;
  columns: ({ title: string; field: string; type?: TableViewDataType; sortable?: boolean } & TableViewSizes)[];
  data: ({ id: string | number; reference?: string } & Record<
    string,
    string | number | { reference: string; value: string | number }
  >)[];
}
