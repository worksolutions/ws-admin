import React from "react";

import Spinner from "primitives/Spinner";

import { useDataSource } from "modules/context/dataSource/useDataSource";

import BackgroundTasksComponent from "./BackgroundTasks";
import { BackgroundTasksDataSourceInterface } from "./types";

import { BlockInterface } from "state/systemState";

function BackgroundTasks({ dataSource }: BlockInterface) {
  const { data } = useDataSource<BackgroundTasksDataSourceInterface>(dataSource!);
  if (!data) return <Spinner color="gray-blue/08" size={36} />;
  return <BackgroundTasksComponent tasks={data} />;
}

export default React.memo(BackgroundTasks);
