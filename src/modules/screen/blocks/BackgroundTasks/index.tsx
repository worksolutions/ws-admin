import React from "react";

import Spinner from "primitives/Spinner";

import { useDataSource } from "modules/context/dataSource/useDataSource";

import BackgroundTasksComponent from "./BackgroundTasks";
import { BackgroundTasksDataSourceInterface } from "./types";

import { BlockInterface } from "state/globalState";

function BackgroundTasks({ dataSource }: BlockInterface) {
  const { data } = useDataSource<BackgroundTasksDataSourceInterface>(dataSource!);
  if (!data) return <Spinner />;
  return <BackgroundTasksComponent tasks={data} />;
}

export default React.memo(BackgroundTasks);
