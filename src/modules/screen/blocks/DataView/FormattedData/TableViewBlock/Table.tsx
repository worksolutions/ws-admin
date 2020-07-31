import React from "react";
import { observer } from "mobx-react-lite";

import Wrapper from "primitives/Wrapper";

import { fullHeight, fullWidth } from "libs/styles";

import { useDataSource } from "modules/context/dataSource/useDataSource";

import TableViewPresenter from "../../Table/Presenter/TableViewPresenter";
import { ViewMetaData } from "../../types";
import { TableViewDataSource } from "../../Table/types";
import { TableViewOptions } from "../../Table/Presenter/types";
import { useFormattedDataLoader } from "../libs";

import { BlockInterface } from "state/systemState";

import { PaginationMeta } from "types/Pagination";

type TableViewBlockInterface = BlockInterface<TableViewOptions, "sorting"> & {
  onUpdateMeta: (data: ViewMetaData) => void;
};

interface TableViewBlockDataSource {
  list: TableViewDataSource;
  pagination: PaginationMeta;
}

function TableView({ dataSource, options, onUpdateMeta, actions }: TableViewBlockInterface) {
  const { data, loadingContainer } = useDataSource<TableViewBlockDataSource>(dataSource!);

  useFormattedDataLoader(data, loadingContainer, onUpdateMeta);

  if (!data) return null;
  if (data.list.length === 0) return null;

  return (
    <Wrapper styles={[fullHeight, fullWidth]}>
      <TableViewPresenter {...data} options={options!} actions={actions!} />
    </Wrapper>
  );
}

export default React.memo(observer(TableView));
