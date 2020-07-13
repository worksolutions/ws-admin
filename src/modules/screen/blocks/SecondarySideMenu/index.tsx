import React from "react";
import { observer } from "mobx-react-lite";

import Spinner from "primitives/Spinner";

import { useDataSource } from "modules/context/dataSource/useDataSource";

import Sidebar from "./Sidebar";
import { SecondaryMenuDataSourceInterface } from "./types";

import { BlockInterface } from "state/systemState";

function SecondarySideMenu({ dataSource }: BlockInterface) {
  const { data, loadingContainer } = useDataSource<SecondaryMenuDataSourceInterface>(dataSource!);
  if (loadingContainer.loading) return <Spinner size={72} />;
  return <Sidebar opened={true} title={data!.title} onChangeOpened={console.log} items={data!.items} />;
}

export default React.memo(observer(SecondarySideMenu));
