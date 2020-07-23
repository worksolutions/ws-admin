import React from "react";
import { observer } from "mobx-react-lite";

import Spinner from "primitives/Spinner";
import Typography from "primitives/Typography";

import { useDataSource } from "modules/context/dataSource/useDataSource";

import { ViewMetaData } from "../types";

import { TableViewDataSource, TableViewOptions } from "./types";
import Table from "./Table";

import { BlockInterface } from "state/systemState";

export interface TableViewBlockInterface extends BlockInterface<TableViewOptions> {
  onUpdateMeta: (data: ViewMetaData) => void;
}

function TableView({ dataSource, options, onUpdateMeta }: TableViewBlockInterface) {
  const { data, loadingContainer } = useDataSource<TableViewDataSource>(dataSource!);

  React.useEffect(() => {
    if (!data) return;
    if (onUpdateMeta) onUpdateMeta({ pagination: data.pagination });
  }, [data]);

  if (loadingContainer.loading) return <Spinner size={36} />;

  if (!data) return <Typography>Нет данных</Typography>;

  return <Table list={data.list} options={options!} />;
}

export default React.memo(observer(TableView));
