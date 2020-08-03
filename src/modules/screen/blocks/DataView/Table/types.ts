import { TableViewItemInterface, TableViewOptions } from "./Presenter/types";

import { BlockInterface } from "state/systemState";

export type TableViewInterface = BlockInterface<TableViewOptions, "sorting"> & {
  onLoadingUpdate?: (loading: boolean) => void;
};

export type TableViewDataSource = Record<string, TableViewItemInterface>[];
