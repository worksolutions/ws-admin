import React from "react";
import { observer } from "mobx-react-lite";

import Wrapper from "primitives/Wrapper";
import Spinner from "primitives/Spinner";
import Typography from "primitives/Typography";

import { ai, Aligns, flex, flexValue } from "libs/styles";

import { useDataSource } from "modules/context/dataSource/useDataSource";

import { defaultBlockPadding } from "../../BlockRenderer/styles";

import { TableViewDataSource, TableViewOptionsInterface } from "./types";
import Table from "./Table";

import { BlockInterface } from "state/systemState";

function TableView({ dataSource, options }: BlockInterface & { options: TableViewOptionsInterface }) {
  const { data, loadingContainer } = useDataSource<TableViewDataSource>(dataSource!);
  if (loadingContainer.loading) return <Spinner color="gray-blue/08" size={36} />;

  return (
    <Wrapper styles={[flex, ai(Aligns.STRETCH), flexValue(1), defaultBlockPadding]}>
      {data ? <Table {...data} options={options} /> : <Typography>Нет данных</Typography>}
    </Wrapper>
  );
}

export default React.memo(observer(TableView));
