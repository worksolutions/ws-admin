import { useLocalStore } from "mobx-react-lite";
import { clone } from "ramda";

import { useAppContext } from "modules/context/hooks/useAppContext";

import { DataSourceResultInterface } from "./common";
import staticDataSource from "./sources/staticDataSource";

import { LoadingContainer } from "state/loadingContainer";

import { DataSourceInterface, DataSourceType } from "types/DataSource";

export function useStaticDataSource<RESULT = any>(dataSource: DataSourceInterface<DataSourceType.STATIC>) {
  const { updateState } = useAppContext();

  const localStore: DataSourceResultInterface<RESULT> = useLocalStore<DataSourceResultInterface<RESULT>>(() => {
    const data = staticDataSource(dataSource);

    if (dataSource.context) updateState({ path: dataSource.context, data });

    return {
      data,
      initialData: clone(data),
      loadingContainer: new LoadingContainer(false),
      reload: () => null,
      updateInitial: () => {},
    };
  });

  return localStore;
}
