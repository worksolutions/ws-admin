import { useLocalStore } from "mobx-react-lite";
import { clone, isNil } from "ramda";
import { Lambda } from "mobx";
import React from "react";

import { splitByPoint } from "libs/path";

import { convertContextDependencyToUpdateStatePayload, useAppContext } from "modules/context/hooks/useAppContext";
import { ContextDependencyInterface } from "modules/context/insertContext";

import { DataSourceResultInterface, makeOnDependencyChangeUpdater } from "./common";
import contextDataSource from "./sources/contextDataSource";

import { LoadingContainer } from "state/loadingContainer";

import { DataSourceInterface, DataSourceType } from "types/DataSource";

function convertDataSourceDependencyToContextDependency(
  dependency: ReturnType<typeof contextDataSource>["dependency"],
): ContextDependencyInterface {
  return {
    contextType: dependency.type,
    path: splitByPoint(dependency.path),
  };
}

export function useContextDataSource<RESULT = any>(
  dataSource: DataSourceInterface<DataSourceType.CONTEXT>,
  initialData: RESULT,
) {
  const { context, updateState } = useAppContext();

  const allDisposers: Lambda[] = [];

  React.useEffect(() => () => allDisposers.forEach((disposer) => disposer()), []);

  const localStore: DataSourceResultInterface<RESULT> = useLocalStore<DataSourceResultInterface<RESULT>>(() => {
    const { dependency, value: data } = contextDataSource(dataSource, context);

    const contextDependency = convertDataSourceDependencyToContextDependency(dependency);

    if (!isNil(initialData)) {
      updateState(convertContextDependencyToUpdateStatePayload(initialData)(contextDependency));
    }

    allDisposers.push(
      makeOnDependencyChangeUpdater(context, () => {
        localStore.data = contextDataSource(dataSource, context).value;
      })(contextDependency),
    );

    if (dataSource.contextPath && data) {
      updateState({ path: dataSource.contextPath, data });

      allDisposers.push(() => {
        updateState({ path: dataSource.contextPath!, data: undefined });
      });
    }

    return {
      data,
      initialData: clone(data),
      loadingContainer: new LoadingContainer(false),
      reload: () => null,
      updateInitial: (data) => (localStore.initialData = clone(data)),
      reset: () => null,
    };
  });

  return localStore;
}
