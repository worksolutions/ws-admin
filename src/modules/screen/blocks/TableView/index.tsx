import React from "react";
import { observer } from "mobx-react-lite";

import Wrapper from "primitives/Wrapper";
import Spinner from "primitives/Spinner";
import Typography from "primitives/Typography";

import { ai, Aligns, flex, flexValue, padding } from "libs/styles";

import { useDataSource } from "modules/context/dataSource/useDataSource";

import { TableViewDataSource } from "./types";
import Table from "./Table";

import { BlockInterface } from "state/systemState";

function TableView({ dataSource }: BlockInterface) {
  const { data, loadingContainer } = useDataSource<TableViewDataSource>(dataSource!);
  if (loadingContainer.loading) return <Spinner size={36} />;

  return (
    <Wrapper styles={[flex, ai(Aligns.STRETCH), flexValue(1)]}>
      {data ? <Table {...data} /> : <Typography>Нет данных</Typography>}
    </Wrapper>
  );
}

export default React.memo(observer(TableView));
