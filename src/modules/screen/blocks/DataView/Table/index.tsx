import React from "react";
import { observer } from "mobx-react-lite";

import { useDataSource } from "modules/context/dataSource/useDataSource";

import { TableViewDataSource, TableViewInterface } from "./types";
import TableViewPresenter from "./Presenter/TableViewPresenter";

function TableView({ dataSource, options, actions, onLoadingUpdate }: TableViewInterface) {
  const { data, loadingContainer } = useDataSource<TableViewDataSource>(dataSource!);

  React.useEffect(() => {
    if (!onLoadingUpdate) return;
    onLoadingUpdate(loadingContainer.loading);
  }, [loadingContainer.loading]);

  if (!data) return null;
  if (data.length === 0) return null;

  return <TableViewPresenter list={data} options={options!} actions={actions!} />;
}

export default React.memo(observer(TableView));
