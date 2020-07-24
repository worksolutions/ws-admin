import { Icons } from "primitives/Icon";

import { Colors } from "libs/styles";

import { PaginationMeta } from "types/Pagination";

export enum TableViewDataType {
  STRING = "STRING",
  "STATUS-STRING" = "STATUS-STRING",
  IMAGE = "IMAGE",
  DATE = "DATE",
}

export enum TableSizes {
  LARGE = "LARGE",
  MEDIUM = "MEDIUM",
  SMALL = "SMALL",
}

export type TableViewColumn = {
  title: string;
  field: string;
  type?: TableViewDataType;
  referenceRedirect?: string;
  resizable?: boolean;
  sortable?: boolean;
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
  value: string | number;
  icon?: {
    name: Icons;
    color: Colors;
  };
}

export interface TableViewDataSource {
  pagination: PaginationMeta;
  list: Record<string, TableViewItemInterface>[];
}
