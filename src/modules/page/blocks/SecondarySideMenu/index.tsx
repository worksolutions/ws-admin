import React from "react";

import Spinner from "primitives/Spinner";

import { useDataSource } from "modules/context/dataSource/useDataSource";

import Sidebar from "./Sidebar";

import { BlockInterface } from "state/systemState";

function SecondarySideMenu({ block }: { block: BlockInterface }) {
  const data = useDataSource(block.dataSource!);
  if (!data) return <Spinner size={72} />;
  return <Sidebar opened={true} title="dfdf" onChangeOpened={console.log} items={data} />;
}

export default React.memo(SecondarySideMenu);
