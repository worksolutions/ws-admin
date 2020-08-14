import React from "react";
import { observer } from "mobx-react-lite";

import { useDataSource } from "modules/context/dataSource/useDataSource";

import Sidebar from "./Sidebar";
import { SecondaryMenuDataSourceInterface } from "./types";

import { BlockInterface } from "state/globalState";

function SecondarySideMenu({ dataSource }: BlockInterface) {
  const { data, loadingContainer } = useDataSource<SecondaryMenuDataSourceInterface>(dataSource!);
  if (loadingContainer.loading) return null;
  return <Sidebar title={data!.title} items={data!.items} id={data!.id} />;
}

export default React.memo(observer(SecondarySideMenu));
