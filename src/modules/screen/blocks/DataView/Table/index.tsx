import React, { Ref } from "react";
import { observer } from "mobx-react-lite";

import Wrapper from "primitives/Wrapper";

import { flex, fullHeight, fullWidth, overflow, position } from "libs/styles";

import { useDataSource } from "modules/context/dataSource/useDataSource";

import { ViewMetaData } from "../types";
import { useFormattedDataLoader } from "../FormattedData/libs";

import { TableViewDataSource, TableViewOptions } from "./types";
import Table from "./Table";

import { BlockInterface } from "state/systemState";

import { AnyAction } from "types/Actions";

export interface TableViewBlockInterface extends BlockInterface<TableViewOptions> {
  onUpdateMeta: (data: ViewMetaData) => void;
  actions: { sorting: AnyAction };
}

function TableView({ dataSource, options, onUpdateMeta, actions }: TableViewBlockInterface, ref: Ref<HTMLElement>) {
  const { data, loadingContainer } = useDataSource<TableViewDataSource>(dataSource!);

  useFormattedDataLoader(data, loadingContainer, onUpdateMeta);

  if (!data) return null;
  if (data.list.length === 0) return null;

  return (
    <Wrapper styles={[position("relative"), fullHeight, fullWidth]}>
      <Table ref={ref} list={data.list} options={options!} actions={actions} />
    </Wrapper>
  );
}

export default React.memo(observer(TableView, { forwardRef: true }));
