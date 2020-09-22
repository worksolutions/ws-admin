import React from "react";
import { toJS } from "mobx";

import isEqual from "libs/CB/changeDetectionStrategy/performance/isEqual";

import { DataSourceResultInterface } from "./dataSourceHooks/common";
import useApiRequestDataSource from "./dataSourceHooks/useApiRequestDataSource";
import { useNotApiRequestDataSource } from "./dataSourceHooks/useNotApiRequestDataSource";

import { LoadingContainer } from "state/loadingContainer";

import { AnyDataSource, DataSourceType } from "types/DataSource";

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

export function useDataSource<RESULT = any>(
  dataSource: AnyDataSource,
  initialData: RESULT = null!,
): DataSourceResultInterface<RESULT> {
  if (!dataSource) return useEmptyDataSource<RESULT>();
  if (dataSource.type === DataSourceType.API_REQUEST) return useApiRequestDataSource(dataSource, initialData);
  return useNotApiRequestDataSource(dataSource);
}
