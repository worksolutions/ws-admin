import React from "react";
import { isNil } from "ramda";

import { useEventEmitter } from "libs/events";

import globalEventBus from "modules/globalEventBus";

import { DataSourceResultInterface } from "./dataSourceHooks/common";
import useApiRequestDataSource from "./dataSourceHooks/useApiRequestDataSource";
import { useStaticDataSource } from "./dataSourceHooks/useStaticDataSource";
import { useContextDataSource } from "./dataSourceHooks/useContextDataSource";

import { LoadingContainer } from "state/loadingContainer";

import { AnyDataSource, DataSourceInterface, DataSourceType } from "types/DataSource";

function useEmptyDataSource<DATA>() {
  return React.useMemo(
    () => ({
      data: null! as DATA,
      initialData: null! as DATA,
      loadingContainer: new LoadingContainer(false),
      reload: () => undefined,
      updateInitial: () => undefined,
    }),
    [],
  );
}

function useApiRequestDataSourceHandler<RESULT>(
  dataSource: DataSourceInterface<DataSourceType.API_REQUEST>,
  initialData: RESULT,
) {
  const localStore = useApiRequestDataSource(dataSource, initialData);

  useEventEmitter(globalEventBus, "FORCE_DATA_SOURCE_RELOAD", (id) => {
    if (isNil(dataSource.options.id)) return;
    if (id !== dataSource.options.id) return;
    localStore.reload();
  });

  React.useEffect(() => {
    return localStore.loadingContainer.observeErrors(() => {
      const error = localStore.loadingContainer.getAnyError();
      if (!error) return;
      globalEventBus.emit("ADD_TOAST", { error: true, text: error });
    });
  }, []);

  return localStore;
}

export function useDataSource<RESULT = any>(
  dataSource: AnyDataSource,
  initialData: RESULT = null!,
): DataSourceResultInterface<RESULT> {
  if (!dataSource) return useEmptyDataSource<RESULT>();
  if (dataSource.type === DataSourceType.API_REQUEST) return useApiRequestDataSourceHandler(dataSource, initialData);
  if (dataSource.type === DataSourceType.STATIC) return useStaticDataSource(dataSource);
  return useContextDataSource(dataSource);
}
