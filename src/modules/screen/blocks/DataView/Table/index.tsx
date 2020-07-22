import React from "react";
import { observer } from "mobx-react-lite";

import Spinner from "primitives/Spinner";
import Typography from "primitives/Typography";

import { useDataSource } from "modules/context/dataSource/useDataSource";

import { TableViewDataSource, TableViewOptions } from "./types";
import Table from "./Table";

import { BlockInterface } from "state/systemState";

function TableView({ dataSource, options }: BlockInterface<TableViewOptions>) {
  const { data, loadingContainer } = useDataSource<TableViewDataSource>(dataSource!);
  if (loadingContainer.loading) return <Spinner size={36} />;

  if (!data) return <Typography>Нет данных</Typography>;

  return <Table data={data} options={options!} />;
}

export default React.memo(observer(TableView));
