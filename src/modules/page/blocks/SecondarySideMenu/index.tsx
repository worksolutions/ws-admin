import React from "react";

import Spinner from "primitives/Spinner";

import { useDataSource } from "modules/context/dataSource/useDataSource";

import Sidebar from "./Sidebar";

import { BlockInterface } from "state/systemState";

function SecondarySideMenu({ block }: { block: BlockInterface }) {
  const data = useDataSource(block.dataSource!);
  if (!data) return <Spinner size={72} />;
  return <Sidebar opened={true} title={data.title} onChangeOpened={console.log} items={data.items} />;
}

export default React.memo(SecondarySideMenu);
