import { useLocalStore } from "mobx-react-lite";
import { clone } from "ramda";

import { useAppContext } from "modules/context/hooks/useAppContext";

import { DataSourceResultInterface } from "./common";
import staticDataSource from "./sources/staticDataSource";
import contextDataSource from "./sources/contextDataSource";

import { LoadingContainer } from "state/loadingContainer";

import { AnyDataSource, DataSourceType } from "types/DataSource";

export function useNotApiRequestDataSource<RESULT = any>(dataSource: AnyDataSource) {
  const { context, updateState } = useAppContext();

  const localStore: DataSourceResultInterface<RESULT> = useLocalStore<DataSourceResultInterface<RESULT>>(() => {
    let data: RESULT = null! as RESULT;

    if (dataSource.type === DataSourceType.STATIC) data = staticDataSource(dataSource);
    if (dataSource.type === DataSourceType.CONTEXT) data = contextDataSource(dataSource, context);

    if (dataSource.context && data) {
      updateState({ path: dataSource.context, data });
    }

    return {
      data,
      initialData: clone(data),
      loadingContainer: new LoadingContainer(false),
      reload: () => null,
      updateInitial: (data) => (localStore.initialData = data),
    };
  });

  return localStore;
}
