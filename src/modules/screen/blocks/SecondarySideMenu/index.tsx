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
  return <Sidebar title={data!.title} items={data!.items} id={data!.id} />;
}

export default React.memo(observer(SecondarySideMenu));
