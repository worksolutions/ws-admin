import React from "react";
import { observer } from "mobx-react-lite";

import { useDataSource } from "modules/context/dataSource/useDataSource";

import { ViewMetaData } from "../types";
import { useSubviewLoader } from "../FormattedData/libs";

import { TableViewDataSource, TableViewOptions } from "./types";
import Table from "./Table";

import { BlockInterface } from "state/systemState";

import { AnyAction } from "types/Actions";

export interface TableViewBlockInterface extends BlockInterface<TableViewOptions> {
  onUpdateMeta: (data: ViewMetaData) => void;
  actions: { sorting: AnyAction };
}

function TableView({ dataSource, options, onUpdateMeta, actions }: TableViewBlockInterface) {
  const { data, loadingContainer } = useDataSource<TableViewDataSource>(dataSource!);

  useSubviewLoader(data, loadingContainer, onUpdateMeta);

  if (!data) return null;
  if (data.list.length === 0) return null;

  return <Table list={data.list} options={options!} actions={actions} />;
}

export default React.memo(observer(TableView));
