import React from "react";

import Spinner from "primitives/Spinner";

import { useDataSource } from "modules/context/dataSource/useDataSource";

import Sidebar from "./Sidebar";
import { SecondaryMenuDataSourceInterface } from "./types";

import { BlockInterface } from "state/systemState";

function SecondarySideMenu({ dataSource }: BlockInterface) {
  const data = useDataSource<SecondaryMenuDataSourceInterface>(dataSource!);
  if (!data) return <Spinner color="gray-blue/09" size={72} />;
  return <Sidebar opened={true} title={data.title} onChangeOpened={console.log} items={data.items} />;
}

export default React.memo(SecondarySideMenu);
