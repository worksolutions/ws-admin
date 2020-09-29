import { useLocalStore } from "mobx-react-lite";
import { clone } from "ramda";

import { useAppContext } from "modules/context/hooks/useAppContext";

import { DataSourceResultInterface } from "./common";
import contextDataSource from "./sources/contextDataSource";

import { LoadingContainer } from "state/loadingContainer";

import { DataSourceInterface, DataSourceType } from "types/DataSource";

export function useContextDataSource<RESULT = any>(dataSource: DataSourceInterface<DataSourceType.CONTEXT>) {
  const { context, updateState } = useAppContext();

  const localStore: DataSourceResultInterface<RESULT> = useLocalStore<DataSourceResultInterface<RESULT>>(() => {
    const data = contextDataSource(dataSource, context);

    if (dataSource.context && data) {
      updateState({ path: dataSource.context, data });
    }

    return {
      data,
      initialData: clone(data),
      loadingContainer: new LoadingContainer(false),
      reload: () => null,
      updateInitial: (data) => (localStore.initialData = clone(data)),
    };
  });

  return localStore;
}
