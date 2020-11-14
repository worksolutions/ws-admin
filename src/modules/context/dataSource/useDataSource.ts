import React from "react";
import { isNil } from "ramda";
import { toJS } from "mobx";

import { useEventEmitter } from "libs/events";
import isEqual from "libs/CB/changeDetectionStrategy/performance/isEqual";

import globalEventBus from "modules/globalEventBus";

import { modelContextPathPostfix } from "../../model";

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
      reset: () => undefined,
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
    const disposer = localStore.loadingContainer.observeErrors(() => {
      if (!localStore.loadingContainer.hasAnyError()) return;
      globalEventBus.emit("ADD_TOAST", { error: true, text: localStore.loadingContainer.getAnyError() });
    });

    return () => {
      disposer();
      localStore.reset();
    };
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

function excludeModelData<T>(data: T) {
  return Object.fromEntries(Object.entries(data).filter(([key]) => !key.includes(modelContextPathPostfix)));
}

export function dataSourceValueWasChanged<T>(data: T, initialData: T) {
  //TODO: убрать excludeModelData после того, как будет реализована модель данных
  return !isEqual(toJS(excludeModelData(data)), toJS(excludeModelData(initialData)));
}
