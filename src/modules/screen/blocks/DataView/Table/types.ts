import { Icons } from "primitives/Icon";

import { Colors } from "libs/styles";

import { PaginationMeta } from "types/Pagination";

export enum TableViewDataType {
  STRING = "STRING",
  "STATUS-STRING" = "STATUS-STRING",
  IMAGE = "IMAGE",
  DATE = "DATE",
  ACTIONS = "ACTIONS",
}

export enum TableSizes {
  LARGE = "LARGE",
  MEDIUM = "MEDIUM",
  SMALL = "SMALL",
}

export interface TableViewColumnSizes {
  minWidth?: number;
}

export type TableViewColumn = {
  title: string;
  field: string;
  type?: TableViewDataType;
  resizable?: boolean;
  sortable?: boolean;
  sizes?: TableViewColumnSizes;
  options?: {
    imageConfig?: {
      heightConfig: TableSizes;
      aspectRatio: number;
    };
  };
};

export type TableViewRowsConfig = {
  paddingConfig: TableSizes;
};

export interface TableViewOptions {
  selectable: boolean;
  columns: TableViewColumn[];
  rowsConfig: TableViewRowsConfig;
  sortingOptions: {
    initialValue: string;
  };
  id: string;
}

export interface TableViewItemInterface {
  value: any;
  redirectReference?: string;
  icon?: {
    name: Icons;
    color: Colors;
  };
}

export interface TableViewDataSource {
  pagination: PaginationMeta;
  list: Record<string, TableViewItemInterface>[];
}
