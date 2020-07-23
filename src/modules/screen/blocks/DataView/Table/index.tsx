import React from "react";
import { observer } from "mobx-react-lite";

import { useDataSource } from "modules/context/dataSource/useDataSource";

import { ViewMetaData } from "../types";
import { useSubviewLoader } from "../FormattedData/libs";

import { TableViewDataSource, TableViewOptions } from "./types";
import Table from "./Table";

import { BlockInterface } from "state/systemState";

export interface TableViewBlockInterface extends BlockInterface<TableViewOptions> {
  onUpdateMeta: (data: ViewMetaData) => void;
}

function TableView({ dataSource, options, onUpdateMeta }: TableViewBlockInterface) {
  const { data, loadingContainer } = useDataSource<TableViewDataSource>(dataSource!);

  useSubviewLoader(data, loadingContainer, onUpdateMeta);

  if (!data) return null;
  if (data.list.length === 0) return null;

  return <Table list={data.list} options={options!} />;
}

export default React.memo(observer(TableView));
