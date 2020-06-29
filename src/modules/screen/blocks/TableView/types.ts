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
  columns: { title: string; field: string; type?: TableViewDataType; sortable?: boolean }[];
  data: ({ id: string | number; reference?: string } & Record<
    string,
    string | number | { reference: string; value: string | number }
  >)[];
}
