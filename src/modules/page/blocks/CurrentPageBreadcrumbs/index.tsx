import React from "react";
import { observer } from "mobx-react-lite";

import Wrapper from "primitives/Wrapper";
import Spinner from "primitives/Spinner";

import { ai, Aligns, flex, flexColumn, flexValue } from "libs/styles";

import { useDataSource } from "modules/context/dataSource/useDataSource";

import { BlockInterface } from "state/systemState";

function CurrentPageBreadcrumbs({ dataSource }: BlockInterface) {
  const data = useDataSource(dataSource!);
  if (!data) return <Spinner color="gray-blue/08" size={36} />;
  return <Wrapper styles={[flex, flexColumn, ai(Aligns.STRETCH), flexValue(1)]}>breadcrumbs</Wrapper>;
}

export default React.memo(observer(CurrentPageBreadcrumbs));
